import { validateSession } from "../helpers/validateSession.js";

export async function Header() {
  //aca estoy tuneando
  const profesiones = await fetch("http://localhost:4000/todos/jobs").then((response)=>response.json()).then((json)=>json.map((s)=>s.profession))
  console.log(profesiones);
  //aca termina
  const $header = document.createElement('header');
  $header.classList.add("flex", "justify-between", "items-center", "p-5", "bg-gradient-to-r", "from-blue-400", "to-blue-500", "text-white");

  const sessionStatus = await validateSession();
  const isLoggedIn = sessionStatus.valid;

  $header.innerHTML = `
    <img src="/unicityLogo.png" alt="Logo" class="h-14 mb-2" />
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
         <button id="add-task" class="bg-green-500 px-4 py-2 rounded-full text-white">Cargar perfil</button>`
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