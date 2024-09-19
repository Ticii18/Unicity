export function homePage() {
  const $principal = document.createElement('main');

  $principal.classList.add("flex-grow")

  $principal.innerHTML = `
    <section class="flex flex-wrap justify-around my-10">
      <!-- Tarjetas de servicios -->
      <!-- Tarjeta 3 -->
      <div
        class="bg-white rounded-lg shadow-lg w-72 m-5 text-center p-5 transition-transform transform hover:-translate-y-2 hover:shadow-xl"
      >
        <img
          src="jardinero.jfif"
          alt="Profile 3"
          class="w-full rounded-full mb-4"
        />
        <h3 class="text-xl text-gray-800 mb-2">Michael Lee</h3>
        <p class="text-gray-600 mb-4">Jardinero</p>
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-400"
          >
          Contactar
        </button>
      </div>
    </section>
        <script src="./src/newMain.js"></script>

  `

  return $principal
}