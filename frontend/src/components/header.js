import { validateSession } from "../helpers/validateSession.js";

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

  async function fetchProfessions() {
    try {
      const response = await fetch("http://localhost:4000/professions/trabajos");
      const professions = await response.json();
      return professions;
    } catch (error) {
      console.error("Error al obtener las profesiones:", error);
      return [];
    }
  }

  const handleSearch = async (query, professionId) => {
    try {
      // Construir la URL base
      let url = new URL('http://localhost:4000/search/buscar');
      let params = new URLSearchParams();

      // Agregar parámetros solo si tienen valor
      if (query) params.append('query', query);
      if (professionId) {
        // Encontrar la profesión seleccionada para enviar su nombre
        const selectedProfession = professions.find(p => p._id === professionId);
        if (selectedProfession) {
          params.append('profession', selectedProfession.profession);
        }
      }

      // Añadir los parámetros a la URL
      url.search = params.toString();

      const response = await fetch(url);
      const results = await response.json();

      // Dispatch del evento con los resultados
      const searchEvent = new CustomEvent("searchResults", {
        detail: { 
          results, 
          isSearch: true,
          filters: {
            query: query || '',
            profession: professionId ? professions.find(p => p._id === professionId)?.profession : ''
          }
        },
      });
      document.dispatchEvent(searchEvent);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const professions = await fetchProfessions();
  const professionsOptions = professions
    .map((prof) => `<option value="${prof._id}">${prof.profession}</option>`)
    .join("");

  $header.innerHTML = `
    <img src="/unicityLogo.png" alt="Logo" class="h-14 mb-2" />
    <div class="flex items-center justify-between w-1/2 h-1/3">
      <input 
        type="text" 
        id="searchInput" 
        placeholder="Buscar servicios..." 
        class="w-full p-3 text-black rounded-full border-none text-lg shadow-md"
      >
      <select 
        id="professionSelect" 
        class="ml-4 p-2 rounded-full border-none text-black shadow-md bg-white"
      >
        <option value="">Todos los oficios</option>
        ${professionsOptions}
      </select>
    </div>

    <div class="flex items-center space-x-4">
      <span class="text-white">${
        isLoggedIn ? sessionStatus.username : "Invitado"
      }</span>
      ${
        isLoggedIn
          ? `
          <button id="logout" class="bg-red-500 px-4 py-2 rounded-full text-white">
            Salir
          </button>
          <button id="add-task" class="bg-green-500 px-4 py-2 rounded-full text-white">
            Cargar perfil
          </button>
        `
          : `
          <button id="login" class="bg-green-500 px-4 py-2 rounded-full text-white">
            Iniciar Sesión
          </button>
        `
      }
    </div>
  `;

  let searchTimeout;
  const searchInput = $header.querySelector("#searchInput");
  const professionSelect = $header.querySelector("#professionSelect");

  // Función para manejar cambios en cualquier filtro
  const handleFilterChange = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearch(searchInput.value, professionSelect.value);
    }, 300);
  };

  // Event listeners para ambos filtros
  searchInput.addEventListener("input", handleFilterChange);
  professionSelect.addEventListener("change", handleFilterChange);

  if (isLoggedIn) {
    $header.querySelector("#logout").addEventListener("click", async () => {
      try {
        await fetch("http://localhost:4000/auth/sign-out", {
          method: "POST",
          credentials: "include",
        });
        window.location.pathname = "/";
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