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
  app.appendChild(await Header()); // Asegúrate de que Header() devuelva un nodo válido

  let page;

  // Usar await si las funciones de las páginas son asincrónicas
  switch (path) {
    case "/":
      page = await homePage();
      break;
    case "/login":
      page = await loginPage();
      break;
    case "/todos":
      page = await todosPage();
      break;
    case "/todos/add":
      page = await addJobPage(); // Asegúrate de que este sea el nombre correcto
      break;
    case "/register":
      page = await registerPage();
      break;
    default:
      page = document.createElement("div");
      page.textContent = "Página no encontrada";
  }

  // Verificar si la variable page es un nodo válido antes de agregarla
  if (page instanceof Node) {
    app.appendChild(page);
  } else {
    console.error("El contenido de la página no es un nodo válido.", page);
  }

  app.appendChild(Footer()); // Asegúrate de que Footer() devuelva un nodo válido
}
