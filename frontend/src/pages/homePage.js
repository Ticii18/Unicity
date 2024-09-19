export async function homePage() {
  // Cambiar a un div en lugar de un elemento personalizado no estándar
  const $principal = document.createElement('div');
  $principal.classList.add("flex-grow");

  try {
    const response = await fetch('http://localhost:4000/todos/jobs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jobs = await response.json();

    // Validar que la respuesta sea un array
    if (!Array.isArray(jobs)) {
      throw new Error('La respuesta no es un array de trabajos');
    }

    // Generar el HTML para los trabajos
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
          class="bg-blue-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-400"
        >
          Contactar
        </button>
      </div>
    `).join('');

    // Añadir el contenido generado al contenedor principal
    $principal.innerHTML = `
      <section class="flex flex-wrap justify-around my-10">
        ${jobsHTML}
      </section>
    `;
  } catch (error) {
    console.error('Error al obtener los trabajos:', error);
    $principal.innerHTML = `<p class="text-center text-red-500">Error al cargar los trabajos: ${error.message}</p>`;
  }

  // Retorna el contenedor con los trabajos
  return $principal;
}
