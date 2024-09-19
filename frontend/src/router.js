import { loginPage } from "./pages/loginPage";
import { homePage } from "./pages/homePage";
import { todosPage } from "./pages/todosPage";
import { addJobPage } from "./pages/addTask";
import { registerPage } from "./pages/registerUser";
import { validateSession } from "./helpers/validateSession";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
export async function router(path, app) {
  // Validar sesión para rutas protegidas
  if (path !== "/" && path !== "/login" && path !== "/register") {
    const result = await validateSession();

    if (!result.valid) {
      window.location.pathname = "/"; // Redirige a la página de inicio si no está autenticado
      return;
    }
  }

  // Limpia el contenido previo
  app.innerHTML = '';

  // Agrega el encabezado y pie de página
  app.appendChild(await Header()); // Asegúrate de que Header() devuelva una promesa que resuelve a un nodo válido
  let page;

  switch (path) {
    case "/":
      page = homePage();
      break;
    case "/login":
      page = loginPage();
      break;
    case "/todos":
      page = todosPage();
      break;
    case "/todos/add":
      page = addJobPage(); // Asegúrate de que este sea el nombre correcto
      break;
    case "/register":
      page = registerPage();
      break;
    default:
      page = document.createElement("div");
      page.textContent = "Página no encontrada";
  }

  if (page instanceof Node) {
    app.appendChild(page);
  } else {
    console.error("El contenido de la página no es un nodo válido.");
  }

  app.appendChild(Footer()); // Asegúrate de que Footer() devuelva un nodo válido
}
