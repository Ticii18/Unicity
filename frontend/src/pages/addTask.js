export const addJobPage = () => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200",
    "p-4"
  );

  const formContainer = document.createElement("div");
  formContainer.classList.add(
    "w-full",
    "max-w-md",
    "bg-white",
    "p-6",
    "rounded",
    "shadow-md",
    "space-y-4",
    "md:w-1/3"
  );

  const homeButton = document.createElement("button");
  homeButton.classList.add(
    "mb-4",
    "bg-gray-300",
    "hover:bg-gray-500",
    "text-gray-800",
    "font-bold",
    "py-2",
    "px-4",
    "rounded"
  );
  homeButton.textContent = "Volver";
  homeButton.addEventListener("click", () => {
    window.location.pathname = "/";
  });

  const form = document.createElement("form");
  form.classList.add("flex", "flex-col", "gap-4");
  form.enctype = "multipart/form-data";

  const title = document.createElement("h2");
  title.classList.add("text-2xl", "font-bold");
  title.textContent = "Agregar Nuevo Trabajo";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  titleInput.classList.add("w-full", "p-2", "border", "border-gray-300", "rounded");
  titleInput.placeholder = "Título del Trabajo";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "description";
  descriptionInput.name = "description";
  descriptionInput.required = true;
  descriptionInput.classList.add("w-full", "p-2", "border", "border-gray-300", "rounded");
  descriptionInput.placeholder = "Descripción del Trabajo";

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "image";
  imageInput.name = "image";
  imageInput.required = true;
  imageInput.accept = "image/*";
  imageInput.classList.add("w-full", "p-2", "border", "border-gray-300", "rounded");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add(
    "w-full",
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded"
  );
  submitButton.textContent = "Agregar Trabajo";

  const divError = document.createElement("div");
  divError.id = "message";
  divError.classList.add("text-red-500", "text-center", "font-bold");

  form.appendChild(title);
  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(imageInput);
  form.appendChild(submitButton);
  form.appendChild(divError);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const description = descriptionInput.value;
    const imageFile = imageInput.files[0];

    if (!title || !description || !imageFile) {
      divError.innerText = "Por favor, completa todos los campos.";
      return;
    }
    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);

    try {
      const response = await fetch(`http://localhost:4000/todos/add/${userId}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al agregar el trabajo");
      }

      const data = await response.json();
      console.log(data);
      window.alert("Trabajo agregado exitosamente");
      window.location.pathname = "/";
    } catch (error) {
      console.error("Error al agregar el trabajo:", error);
      divError.innerText = "Error al agregar el trabajo.";
    }
  });

  formContainer.appendChild(homeButton);
  formContainer.appendChild(form);
  container.appendChild(formContainer);

  return container;
};