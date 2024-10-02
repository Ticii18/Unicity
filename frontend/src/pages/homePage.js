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
      // Continuamos sin sesión válida
    }

    const response = await fetch('http://localhost:4000/todos/jobs', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Si el error es de autenticación, simplemente mostramos los trabajos sin opciones de edición
        console.log('Usuario no autenticado, mostrando trabajos sin opciones de edición');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    
    const Curriculum = await response.json();
    console.log('Curriculum.userId:', Curriculum.userId);
    console.log('currentUserId:', currentUserId);

    if (Curriculum.length === 0) {
      $principal.innerHTML = '<p class="text-center text-gray-500">No hay trabajos disponibles en este momento.</p>';
      return $principal;
    }

    const CurriculumHTML = Curriculum.map(Curriculum => {
      const imageUrl = Curriculum.profilePhoto && Curriculum.profilePhoto.data
        ? `data:${Curriculum.profilePhoto.contentType};base64,${Curriculum.profilePhoto.data}`
        : 'placeholder.jpg';

      return `
        <div class="bg-white rounded-lg shadow-lg w-72 m-5 text-center p-5 transition-transform transform hover:-translate-y-2 hover:shadow-xl job-element" data-job-id="${Curriculum._id}">
          <img src="${imageUrl}" 
               alt="${Curriculum.name || 'Usuario'}" 
               class="w-full h-60 object-cover rounded-3xl mb-2" 
               onerror="this.onerror=null; this.src='placeholder.jpg';" />
          <h3 class="text-xl text-gray-800 mb-2">${Curriculum.name || 'Usuario'}</h3>
          <p class="text-gray-600 mb-4">${Curriculum.profession || 'Profesión no especificada'}</p>
          <p class="text-sm text-gray-500 mb-4">${Curriculum.experience?.CurriculumDescription || 'Sin descripción'}</p>
          <button class="bg-blue-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-400 mb-2">Contactar</button>
        ${Curriculum.userId === currentUserId ? `<button class="delete-job-btn bg-red-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-red-400" data-user-id="${currentUserId}" data-job-id="${Curriculum._id}">Eliminar</button>` : ''}
        </div>
      `;
    }).join('');

    $principal.innerHTML = `
      <section class="flex flex-wrap justify-around my-10">${CurriculumHTML}</section>
    `;

    // Agregar el event listener para eliminar trabajos solo si el usuario está logueado
    $principal.querySelectorAll('.delete-job-btn').forEach(button => {
      button.addEventListener('click', function() {
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
