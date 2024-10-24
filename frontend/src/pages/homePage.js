import { validateSession } from "../helpers/validateSession";

export async function homePage() {
  const $principal = document.createElement('div');
  $principal.classList.add("flex-grow");

  try {
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

    const response = await fetch('http://localhost:4000/todos/jobs', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log('Usuario no autenticado, mostrando trabajos sin opciones de edición');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const Curriculum = await response.json();
    if (Curriculum.length === 0) {
      $principal.innerHTML = '<p class="text-center text-gray-500">No hay trabajos disponibles en este momento.</p>';
      return $principal;
    }
    
    // Ruta para obtener las profesiones de la colección mediante el ID
    const getProfessionName = async (id) => {
      try {
        const response = await fetch(`http://localhost:4000/professions/trabajos/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const profession = await response.json(); // Asegúrate de que recibes el objeto correcto
        return profession.profession || 'Profesión no especificada'; // Devuelve el nombre de la profesión
      } catch (error) {
        console.error("Error al obtener la profesión:", error);
        return 'Profesión no especificada'; // Valor por defecto en caso de error
      }
    };
    
    

    const CurriculumHTML = await Promise.all(Curriculum.map(async(Curriculum) => {
      const professionName = await getProfessionName(Curriculum.professionId);
      const imageUrl = Curriculum.profilePhoto && Curriculum.profilePhoto.data
        ? `data:${Curriculum.profilePhoto.contentType};base64,${Curriculum.profilePhoto.data}`
        : 'placeholder.jpg';
      return `
        <div class="bg-white rounded-lg shadow-lg w-72 m-5 text-center p-5 transition-transform transform hover:-translate-y-2 hover:shadow-xl job-element" data-job-id="${Curriculum._id}">
                  ${Curriculum.userId === currentUserId ?
          `<img src="circulo-de-basura.svg" alt="Eliminar" class="delete-job-btn h-10 mb-2 cursor-pointer" data-user-id="${currentUserId}" data-job-id="${Curriculum._id}" />`
          : ''}
          <img src="${imageUrl}" 
               alt="${Curriculum.name || 'Usuario'}" 
               class="w-full h-60 object-cover rounded-3xl mb-2" 
               onerror="this.onerror=null; this.src='placeholder.jpg';" />
          <h3 class="text-xl text-gray-800 mb-2">${Curriculum.name || 'Usuario'}</h3>
          <p class="text-gray-600 mb-4">${professionName || 'Profesión no especificada'}</p>
          <p class="text-sm text-gray-500 mb-4">${Curriculum.experience?.CurriculumDescription || 'Sin descripción'}</p>
          <button class="contactarBtn bg-blue-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-400 mb-2" data-curriculum-id="${Curriculum._id}">Contactar</button>

        </div>
      `;
    }))
    console.log("concha",Curriculum.name);


    $principal.innerHTML = `
      <section class="flex flex-wrap justify-around my-10">${CurriculumHTML.join('')}</section>
    `;

    // Agregar el event listener para los botones de "Contactar"
    $principal.querySelectorAll('.contactarBtn').forEach(button => {
      button.addEventListener('click', function () {
        const curriculumId = this.getAttribute('data-curriculum-id');

        if (!curriculumId) {
          alert("Error: No se encontró el ID del currículum.");
          return;
        }

        localStorage.setItem("curriculumId", curriculumId);
        window.location.pathname = "/employee"; // Redirigir a la página de vista de detalles
      });
    });



    // Agregar el event listener para eliminar trabajos solo si el usuario está logueado
    $principal.querySelectorAll('.delete-job-btn').forEach(button => {
      button.addEventListener('click', function () {
        const userId = this.getAttribute('data-user-id');
        const jobId = this.getAttribute('data-job-id');
        const jobElement = this.closest('.job-element'); // Obtener el elemento contenedor del trabajo

        fetch(`http://localhost:4000/todos/delete/${jobId}`, {
          method: 'DELETE',
          credentials: 'include',
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(response => {
          if (response.ok) {
            window.alert('Perfil eliminado');
            jobElement.remove(); // Eliminar el elemento del DOM
          } else {
            window.alert('Error al eliminar el perfil');
          }
        }).catch(error => {
          console.error("Error al eliminar el perfil:", error);
          window.alert('Ocurrió un error al intentar eliminar el perfil');
        });
      });
    });
  } catch (error) {
    console.error('Error al obtener los trabajos:', error);
    $principal.innerHTML = `<p class="text-center text-red-500">Error al cargar los trabajos: ${error.message}</p>`;
  }

  return $principal;
}
