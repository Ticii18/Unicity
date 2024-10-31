import { validateSession } from "../helpers/validateSession.js";
import { homePage } from "../pages/homePage.js"; // Asegúrate de importar la función homePage

export async function Header() {
  const $header = document.createElement("header");
  $header.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "p-5",
    "bg-gradient-to-r",
    "from-blue-400",
    "to-blue-500",
    "text-white"
  );

  const sessionStatus = await validateSession();
  const isLoggedIn = sessionStatus.valid;

  $header.innerHTML = `
    <img src="/unicityLogo.png" alt="Logo" class="h-14 mb-2" />
    <input type="text" placeholder="Buscar..." class="w-1/2 p-2 rounded-full border-none text-lg shadow-md" />
    <select class="p-2 rounded-full border-none text-black shadow-md bg-white">
      <option value="" disabled selected>Filtrar</option>
      <option value="Electricidad">Electricidad</option>
      <option value="Carpintería">Carpintería</option>
      <option value="Albañilería">Albañilería</option>
    </select>
    <div class="flex items-center space-x-4">
      <span id="user-name" class="text-lg font-semibold">${
        isLoggedIn ? sessionStatus.username : "Invitado"
      }</span>
      ${
        isLoggedIn
          ? `<button id="logout" class="bg-red-500 px-4 py-2 rounded-full text-white">Salir</button>
             <button id="add-task" class="bg-green-500 px-4 py-2 rounded-full text-white">Cargar perfil</button>`
          : `<button id="login" class="bg-green-500 px-4 py-2 rounded-full text-white">Iniciar Sesión</button>`
      }
    </div>
  `;
  // Event listeners para las funcionalidades
  if (isLoggedIn) {
    $header.querySelector("#logout").addEventListener("click", async () => {
      try {
        await fetch("http://localhost:4000/todos/jobs/", {
          method: "POST",
          credentials: "include",
        });
        window.location.pathname = "/"; // Redirigir a la página de inicio de sesión
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    });

    $header.querySelector("#add-task").addEventListener("click", () => {
      window.location.pathname = "/todos/add";
    });
  } else {
    $header.querySelector("#login").addEventListener("click", () => {
      window.location.pathname = "/login";
    });
  }

  return $header;
}
