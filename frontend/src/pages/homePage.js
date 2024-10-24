import { validateSession } from "../helpers/validateSession";
// homePage.js
export async function homePage() {
  const $principal = document.createElement('div');
  $principal.classList.add("flex-grow");

  let currentUserId = null;
  let isLoggedIn = false;

  try {
    const session = await validateSession();
    if (session.valid) {
      currentUserId = session.userId;
      isLoggedIn = true;
    }
  } catch (error) {
    console.error('Error al validar la sesión:', error);
  }

  // Función para obtener el nombre de la profesión
  const getProfessionName = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/professions/trabajos/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const profession = await response.json();
      return profession.profession || 'Profesión no especificada';
    } catch (error) {
      console.error("Error al obtener la profesión:", error);
      return 'Profesión no especificada';
    }
  };

  // Función para adjuntar event listeners
  const attachEventListeners = ($element) => {
    // Contactar button listeners
    $element.querySelectorAll('.contactarBtn').forEach(button => {
      button.addEventListener('click', function() {
        const curriculumId = this.getAttribute('data-curriculum-id');
        if (curriculumId) {
          localStorage.setItem("curriculumId", curriculumId);
          window.location.pathname = "/employee";
        }
      });
    });

    // Delete button listeners
    $element.querySelectorAll('.delete-job-btn').forEach(button => {
      button.addEventListener('click', async function() {
        const userId = this.getAttribute('data-user-id');
        const jobId = this.getAttribute('data-job-id');
        const jobElement = this.closest('.job-element');

        try {
          const response = await fetch(`http://localhost:4000/todos/delete/${jobId}`, {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({ userId }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            window.alert('Perfil eliminado');
            jobElement.remove();
          } else {
            window.alert('Error al eliminar el perfil');
          }
        } catch (error) {
          console.error("Error al eliminar el perfil:", error);
          window.alert('Ocurrió un error al intentar eliminar el perfil');
        }
      });
    });
  };

  const renderCurriculums = async (curriculums, isSearch = false) => {
    const CurriculumHTML = await Promise.all(curriculums.map(async (Curriculum) => {
      let professionName;
      
      if (isSearch) {
        professionName = Curriculum.professionId.profession;
      } else {
        professionName = await getProfessionName(Curriculum.professionId);
      }

      // Manejo más detallado de la foto del perfil
      let imageUrl = 'placeholder.jpg';
      if (Curriculum.profilePhoto && Curriculum.profilePhoto.data) {
        // Verificar si los datos de la foto ya están en base64
        const photoData = typeof Curriculum.profilePhoto.data === 'string' 
          ? Curriculum.profilePhoto.data 
          : Buffer.from(Curriculum.profilePhoto.data).toString('base64');
          
        imageUrl = `data:${Curriculum.profilePhoto.contentType};base64,${photoData}`;
      }

      return `
        <div class="bg-white rounded-lg shadow-lg w-72 m-5 text-center p-5 transition-transform transform hover:-translate-y-2 hover:shadow-xl job-element" data-job-id="${Curriculum._id}">
          ${Curriculum.userId === currentUserId ?
            `<img src="circulo-de-basura.svg" alt="Eliminar" class="delete-job-btn h-10 mb-2 cursor-pointer" data-user-id="${currentUserId}" data-job-id="${Curriculum._id}" />` 
            : ''
          }
          <img src="${imageUrl}" 
               alt="${Curriculum.name || 'Usuario'}" 
               class="w-full h-60 object-cover rounded-3xl mb-2" 
               onerror="this.onerror=null; this.src='placeholder.jpg';" />
          <h3 class="text-xl text-gray-800 mb-2">${Curriculum.name || 'Usuario'}</h3>
          <p class="text-gray-600 mb-4">${professionName}</p>
          <button class="contactarBtn bg-blue-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-400 mb-2" data-curriculum-id="${Curriculum._id}">Contactar</button>
        </div>
      `;
    }));

    $principal.innerHTML = `
      <section class="flex flex-wrap justify-around my-10">
        ${CurriculumHTML.length > 0 
          ? CurriculumHTML.join('') 
          : '<p class="text-center text-gray-500 w-full">No se encontraron resultados.</p>'}
      </section>
    `;

    attachEventListeners($principal);
  };

  // Carga inicial
  try {
    const response = await fetch('http://localhost:4000/todos/jobs', {
      credentials: 'include',
    });

    if (!response.ok && response.status !== 401) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const initialCurriculums = await response.json();
    await renderCurriculums(initialCurriculums, false); // false indica que no es una búsqueda
  } catch (error) {
    console.error('Error al cargar los trabajos:', error);
    $principal.innerHTML = `<p class="text-center text-red-500">Error al cargar los trabajos: ${error.message}</p>`;
  }

  // Listen for search results
  document.addEventListener('searchResults', async (event) => {
    const { results, isSearch } = event.detail;
    await renderCurriculums(results, isSearch);
  });

  return $principal;
}