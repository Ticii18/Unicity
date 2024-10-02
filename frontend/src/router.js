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

  // Agregar el Header al DOM
  app.appendChild(await Header());

  let page;

  switch (path) {
    case "/":
      page = await homePage(); // Asegúrate de que homePage devuelva una promesa
      break;
    case "/login":
      page = await loginPage(); // Asegúrate de que loginPage devuelva una promesa
      break;
    case "/todos":
      page = await todosPage(); // Asegúrate de que todosPage devuelva una promesa
      break;
    case "/todos/add":
      page = await curriculumPage(); // Asegúrate de que curriculumPage devuelva una promesa
      break;
    case "/register":
      page = await registerPage(); // Asegúrate de que registerPage devuelva una promesa
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
