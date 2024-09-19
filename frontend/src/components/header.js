import { validateSession } from "../helpers/validateSession.js";

export async function Header() {
  const $header = document.createElement('header');
  $header.classList.add("flex", "justify-between", "items-center", "p-5", "bg-gradient-to-r", "from-blue-400", "to-blue-500", "text-white");

  const sessionStatus = await validateSession();
  const isLoggedIn = sessionStatus.valid;

  $header.innerHTML = `
    <div class="text-2xl font-bold animate-pulse" style="animation: glow 1.5s ease-in-out infinite alternate">Unicity</div>
    <input type="text" placeholder="Buscar..." class="w-1/2 p-2 rounded-full border-none text-lg shadow-md" />
    <select class="p-2 rounded-full border-none text-black shadow-md bg-white">
      <option value="" disabled selected>Filtrar</option>
      <option value="option1">Electricidad</option>
      <option value="option2">Carpintería</option>
      <option value="option3">Albañilería</option>
    </select>
    <div class="flex items-center space-x-4">
      <span id="user-name" class="text-lg font-semibold">${isLoggedIn ? sessionStatus.username : 'Invitado'}</span>
      ${isLoggedIn
      ? `<button id="logout" class="bg-red-500 px-4 py-2 rounded-full text-white">Salir</button>
         <button id="add-task" class="bg-green-500 px-4 py-2 rounded-full text-white">Agregar Tarea</button>`
      : `<button id="login" class="bg-green-500 px-4 py-2 rounded-full text-white">Iniciar Sesión</button>`
    }
    </div>
  `;
  if (isLoggedIn) {
    $header.querySelector('#logout').addEventListener('click', async () => {
      try {
        await fetch('http://localhost:4000/auth/sign-out', { method: 'POST', credentials: 'include' });
        window.location.pathname = "/"; // Redirigir a la página de inicio de sesión
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    });

    $header.querySelector('#add-task').addEventListener('click', () => {
      window.location.pathname = "/todos/add";
    });
  } else {
    $header.querySelector('#login').addEventListener('click', () => {
      window.location.pathname = "/login";
    });

  }

  return $header;
}