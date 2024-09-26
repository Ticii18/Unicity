import { validateSession } from '../helpers/validateSession.js';

export function deleteJobs(userId, jobId) {
  console.log(`Eliminando trabajo con ID: ${jobId} para el usuario con ID: ${userId}`);
  
  fetch(`http://localhost:4000/todos/delete/${userId}/${jobId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error al eliminar el trabajo: ${response.status}`);
    }
    console.log('Trabajo eliminado');
    location.reload();
  })
  .catch(error => console.error('Error al eliminar el trabajo:', error));
}

export async function homePage() {
  const $principal = document.createElement('div');
  $principal.classList.add("flex-grow");
  
  try {
    const session = await validateSession();
    const currentUserId = session.userId;
    
    const response = await fetch('http://localhost:4000/todos/jobs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jobs = await response.json();
    
    if (!Array.isArray(jobs)) {
      throw new Error('La respuesta no es un array de trabajos');
    }
    
    const jobsHTML = jobs.map(job => `
      <div class="bg-white rounded-lg shadow-lg w-72 m-5 text-center p-5 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
        <img
          src="${job.profilePhoto || 'placeholder.jpg'}"
          alt="${job.title}"
          class="w-full h-60 object-cover rounded-3xl mb-2"
        />
        <h3 class="text-xl text-gray-800 mb-2">${job.userName || 'Usuario'}</h3>
        <p class="text-gray-600 mb-4">${job.title}</p>
        <p class="text-sm text-gray-500 mb-4">${job.description}</p>
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-400 mb-2"
        >
          Contactar
        </button>
        ${job.userId === currentUserId ? `
          <button
            class="delete-job-btn bg-red-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-red-400"
            data-user-id="${currentUserId}"
            data-job-id="${job._id}">
            Eliminar
          </button>
        ` : ''}
      </div>
    `).join('');
    
    $principal.innerHTML = `
      <section class="flex flex-wrap justify-around my-10">
        ${jobsHTML}
      </section>
    `;
    
    $principal.querySelectorAll('.delete-job-btn').forEach(button => {
      button.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        const jobId = this.getAttribute('data-job-id');
        deleteJobs(userId, jobId);
      });
    });
    
  } catch (error) {
    console.error('Error al obtener los trabajos:', error);
    $principal.innerHTML = `<p class="text-center text-red-500">Error al cargar los trabajos: ${error.message}</p>`;
  }
  
  return $principal;
}