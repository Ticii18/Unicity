import { loginPage } from "./pages/loginPage.js";
import { homePage } from "./pages/homePage.js";
import { todosPage } from "./pages/todosPage.js";
import { curriculumPage } from "./pages/addJob.js"; // Asegúrate de que el nombre del archivo sea correcto
import { registerPage } from "./pages/registerUser.js";
import { validateSession } from "./helpers/validateSession.js";
import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";

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

  // Agregar el Header al DOM solo si la ruta no es "/todos/add"
  if (path !== "/todos/add") {
    app.appendChild(await Header());
  }

  let page;

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
      page = await curriculumPage(); 
      break;
    case "/register":
      page = await registerPage(); 
      break;
    default:
      page = document.createElement("div");
      page.textContent = "404 - Página no encontrada";
      break;
  }

  // Asegúrate de que page sea un nodo DOM válido
  if (page instanceof Node) {
    app.appendChild(page);
  } else {
    console.error("La página no devolvió un nodo DOM válido:", page);
    const errorElement = document.createElement('div');
    errorElement.textContent = "Error al cargar la página";
    app.appendChild(errorElement);
  }

  // Agregar el Footer al DOM
  app.appendChild(await Footer());
}
