import { validateSession } from "../helpers/validateSession";

export async function homePage() {
  const $principal = document.createElement('div');
  $principal.classList.add("flex-grow");

  try {
    const session = await validateSession();
    if (!session.valid) {
      $principal.innerHTML = '<p class="text-center text-red-500">Por favor, inicie sesión para ver los trabajos.</p>';
      return $principal;
    }

    const currentUserId = session.userId;
    
    const response = await fetch('http://localhost:4000/todos', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const jobs = await response.json();
    
    if (jobs.length === 0) {
      $principal.innerHTML = '<p class="text-center text-gray-500">No hay trabajos disponibles en este momento.</p>';
      return $principal;
    }
    
    const jobsHTML = jobs.map(job => `
      <div class="bg-white rounded-lg shadow-lg w-72 m-5 text-center p-5 transition-transform transform hover:-translate-y-2 hover:shadow-xl job-element" data-job-id="${job._id}">
        <img src="${job.profilePhoto || 'placeholder.jpg'}" alt="${job.title}" class="w-full h-60 object-cover rounded-3xl mb-2" />
        <h3 class="text-xl text-gray-800 mb-2">${job.userName || 'Usuario'}</h3>
        <p class="text-gray-600 mb-4">${job.title}</p>
        <p class="text-sm text-gray-500 mb-4">${job.description}</p>
        <button class="bg-blue-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-400 mb-2">Contactar</button>
        ${job.userId === currentUserId ? `<button class="delete-job-btn bg-red-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-red-400" data-user-id="${currentUserId}" data-job-id="${job._id}">Eliminar</button>` : ''}
      </div>
    `).join('');
    
    $principal.innerHTML = `<section class="flex flex-wrap justify-around my-10">${jobsHTML}</section>`;
    
    // Agregar el event listener para eliminar trabajos
    
    // UNA MANERA DE ELIMINAR EL PERFIL Y RECARGAR LA PÁGINA AUTOMÁTICAMENTE

    $principal.querySelectorAll('.delete-job-btn').forEach(button => {
      button.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        const jobId = this.getAttribute('data-job-id');
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
            location.reload(); // Recargar la página
          } else {
            window.alert('Error al eliminar el perfil');
          }
        });
      });
    });
    
    // SEGUNDA FORMA DE ELIMINAR EL PERFIL
    // $principal.querySelectorAll('.delete-job-btn').forEach(button => {
    //   button.addEventListener('click', function() {
    //     const userId = this.getAttribute('data-user-id');
    //     const jobId = this.getAttribute('data-job-id');
    //     const jobElement = this.closest('.job-element'); // Obtener el elemento contenedor del trabajo
    
    //     fetch(`http://localhost:4000/todos/delete/${jobId}`, {
    //       method: 'DELETE',
    //       credentials: 'include',
    //       body: JSON.stringify({ userId }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }).then(response => {
    //       if (response.ok) {
    //         window.alert('Perfil eliminado');
    //         jobElement.remove(); // Eliminar el elemento del DOM
    //       } else {
    //         window.alert('Error al eliminar el perfil');
    //       }
    //     }).catch(error => {
    //       console.error("Error al eliminar el perfil:", error);
    //       window.alert('Ocurrió un error al intentar eliminar el perfil');
    //     });
    //   });
    // });

  } catch (error) {
    console.error('Error al obtener los trabajos:', error);
    $principal.innerHTML = `<p class="text-center text-red-500">Error al cargar los trabajos: ${error.message}</p>`;
  }
  
  return $principal;
}

