export const viewPage = async () => {
  const container = document.createElement("div");
  container.classList.add("bg-gray-100");

  // Botón para volver al inicio
  const homeButton = document.createElement("a");
  homeButton.href = "/";
  homeButton.classList.add(
    "fixed",
    "top-4",
    "left-4",
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "hover:bg-blue-700",
    "transition"
  );
  homeButton.textContent = "Volver al Inicio";
  container.appendChild(homeButton);

  // Obtener el ID del currículum desde localStorage
  const curriculumId = localStorage.getItem("curriculumId");
  const loggedInUserId = localStorage.getItem("userId"); // Obtener el userId del localStorage

  if (!curriculumId) {
    container.innerHTML = `<p class="text-red-500 text-center">Error: No se encontró el ID del currículum.</p>`;
    return container;
  }

  // Obtener los datos del currículum de la base de datos
  let curriculumData = null;
  try {
    const response = await fetch(`http://localhost:4000/todos/${curriculumId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el currículum: ${response.statusText}`);
    }

    curriculumData = await response.json();
  } catch (error) {
    console.error("Error al cargar el currículum:", error);
    container.innerHTML = `<p class="text-red-500 text-center">Error al cargar el currículum: ${error.message}. Intente nuevamente más tarde.</p>`;
    return container;
  }

  // Crear el formulario para mostrar los datos del currículum
  const form = document.createElement("form");
  form.classList.add("max-w-4xl", "mx-auto", "p-6", "bg-white", "rounded-lg", "shadow-lg");
  form.id = "curriculumForm";

  // Encabezado
  const header = document.createElement("header");
  header.classList.add("bg-blue-600", "text-white", "py-6");
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("container", "mx-auto", "text-center");

  const fotoLabel = document.createElement("label");
  fotoLabel.setAttribute("for", "fotoPerfil");
  fotoLabel.classList.add("block", "mb-2", "text-lg", "font-bold");
  fotoLabel.textContent = "Foto de Perfil:";

  const fotoImg = document.createElement("img");

  // Obtener los datos de la foto de perfil
  const { profilePhoto } = curriculumData;

  // Intentar construir la fuente de la imagen
  try {
    const imageData = profilePhoto?.data?.data || []; // Usar un array vacío como fallback
    const contentType = profilePhoto?.contentType || 'image/jpeg'; // Tipo de contenido por defecto

    // Crear la fuente de la imagen solo si imageData es un array
    const base64 = Array.isArray(imageData)
      ? btoa(String.fromCharCode(...new Uint8Array(imageData)))
      : 'placeholder.jpg'; // Si no es un array, se usará la imagen de marcador de posición

    fotoImg.src = `data:${contentType};base64,${base64}`;
  } catch (e) {
    fotoImg.src = 'placeholder.jpg'; // Si hay un error, usar imagen de marcador de posición
  }

  // Configuración de la imagen
  fotoImg.alt = curriculumData.name || 'Usuario';
  fotoImg.classList.add("w-32", "h-32", "object-cover", "mx-auto", "mb-4", "rounded-full");

  // Manejar el error de carga de la imagen
  fotoImg.onerror = function () {
    this.onerror = null; // Evitar bucles infinitos
    this.src = 'placeholder.jpg'; // Usar imagen de marcador de posición
  };

  const nombre = document.createElement("h1");
  nombre.classList.add("text-4xl", "font-bold", "mt-6");
  nombre.textContent = curriculumData.name || "Nombre no especificado";

  const profesion = document.createElement("p");
  profesion.classList.add("text-xl", "mt-2");
  profesion.textContent = curriculumData.profession || "Profesión no especificada";

  // Agregar los elementos al div del header
  headerDiv.appendChild(fotoLabel);
  headerDiv.appendChild(fotoImg);
  headerDiv.appendChild(nombre);
  headerDiv.appendChild(profesion);
  header.appendChild(headerDiv);

  form.appendChild(header);

  // Información Personal
  const personalInfoSection = document.createElement("section");
  personalInfoSection.classList.add(
    "bg-white",
    "shadow-lg",
    "rounded-lg",
    "p-6",
    "mt-6",
    "mx-4",
    "md:mx-auto",
    "max-w-4xl"
  );

  const personalInfoTitle = document.createElement("h2");
  personalInfoTitle.classList.add("text-2xl", "font-bold", "text-gray-700");
  personalInfoTitle.textContent = "Información Personal";
  personalInfoSection.appendChild(personalInfoTitle);

  const addInputField = (labelText, value, name, type = "text", isEditable = true) => {
    const div = document.createElement("div");
    div.classList.add("mt-4");

    const label = document.createElement("label");
    label.classList.add("font-semibold", "text-gray-700");
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.value = value; // Mostrar el valor existente
    input.name = name; // Añadir atributo "name" para el envío de datos
    input.classList.add(
      "block",
      "w-full",
      "mt-2",
      "p-2",
      "border-2",
      "border-gray-300",
      "rounded-lg",
      "text-gray-600"
    );

    // Si no se puede editar, configurar el input como solo lectura
    if (!isEditable) {
      input.readOnly = true;
      input.classList.add("bg-gray-200"); // Opcional: cambia el fondo si es solo lectura
    }

    div.appendChild(label);
    div.appendChild(input);

    return div;
  };

  personalInfoSection.appendChild(addInputField("Correo:", curriculumData.email || "", "correo", "email", loggedInUserId === curriculumData.userId));
  personalInfoSection.appendChild(addInputField("Teléfono:", curriculumData.phone || "", "telefono", "tel", loggedInUserId === curriculumData.userId));
  personalInfoSection.appendChild(addInputField("LinkedIn:", curriculumData.linkedin || "", "linkedin", "text", loggedInUserId === curriculumData.userId));
  personalInfoSection.appendChild(addInputField("Sitio web:", curriculumData.website || "", "sitioWeb", "url", loggedInUserId === curriculumData.userId));

  form.appendChild(personalInfoSection);

  // Crear la sección de Experiencia Profesional
  const experienceSection = document.createElement("section"); // Crea un nuevo elemento de sección
  experienceSection.classList.add( // Agrega clases CSS para estilizar la sección
    "bg-white", "shadow-lg", "rounded-lg", "p-6", "mt-6", "mx-4",
    "md:mx-auto", "max-w-4xl"
  );

  // Crear el título para la sección de experiencia
  const experienceTitle = document.createElement("h2"); // Crea un nuevo elemento de encabezado
  experienceTitle.classList.add("text-2xl", "font-bold", "text-gray-700"); // Agrega clases CSS para estilizar el título
  experienceTitle.textContent = "Experiencia Profesional"; // Establece el texto del título
  experienceSection.appendChild(experienceTitle); // Agrega el título a la sección de experiencia

  // Función para crear campos de experiencia
  const createExperienceFields = (experience, index = '') => {
    // Define los campos que se crearán para cada experiencia
    const fields = [
      { label: `Empresa${index}:`, value: experience.company, name: `empresa${index}` },
      { label: `Duración${index}:`, value: experience.duration, name: `duracion${index}` },
      { label: "Descripción del Puesto:", value: experience.jobDescription, name: `jobDescription${index}` }
    ];

    const container = document.createElement("div"); // Crea un contenedor para los campos
    container.classList.add("mb-6", "border-b", "pb-4"); // Agrega clases para el estilo del contenedor

    // Recorre cada campo y crea su respectivo elemento de entrada
    fields.forEach(field => {
      container.appendChild( // Agrega cada campo al contenedor
        addInputField( // Llama a la función para crear el campo de entrada
          field.label, // Etiqueta del campo
          field.value || "", // Valor inicial (vacío si no hay valor)
          field.name, // Nombre del campo
          "text", // Tipo de entrada (texto)
          loggedInUserId === curriculumData.userId // Permitir edición solo si el usuario está logueado
        )
      );
    });

    return container; // Devuelve el contenedor con los campos de experiencia
  };

  // Mostrar mensaje si no hay experiencias
  if (!curriculumData.experience) {
    const message = document.createElement("p"); // Crea un nuevo elemento de párrafo
    message.textContent = "No hay experiencia profesional disponible."; // Establece el texto del mensaje
    message.classList.add("text-gray-500", "mt-2"); // Agrega clases para estilizar el mensaje
    experienceSection.appendChild(message); // Agrega el mensaje a la sección de experiencia
  }
  // Mostrar experiencias si existen
  else {
    // Convertir a array si es un solo objeto
    const experiences = Array.isArray(curriculumData.experience)
      ? curriculumData.experience // Si es un array, usa el array directamente
      : [curriculumData.experience]; // Si no, conviértelo en un array

    // Crear sección para cada experiencia
    experiences.forEach((exp, index) => {
      // Llama a la función para crear campos de experiencia y los agrega a la sección
      const expSection = createExperienceFields(exp, experiences.length > 1 ? ` ${index + 1}` : '');
      experienceSection.appendChild(expSection); // Agrega la sección de experiencia creada
    });
  }

  // Finalmente, agrega la sección de experiencia al formulario
  form.appendChild(experienceSection);


  // Habilidades
  const skillsSection = document.createElement("section");
  skillsSection.classList.add(
    "bg-white",
    "shadow-lg",
    "rounded-lg",
    "p-6",
    "mt-6",
    "mx-4",
    "md:mx-auto",
    "max-w-4xl"
  );

  const skillsTitle = document.createElement("h2");
  skillsTitle.classList.add("text-2xl", "font-bold", "text-gray-700");
  skillsTitle.textContent = "Habilidades";
  skillsSection.appendChild(skillsTitle);

  skillsSection.appendChild(addInputField("Habilidad 1:", curriculumData.skills?.[0] || "", "habilidad1", "text", loggedInUserId === curriculumData.userId));

  skillsSection.appendChild(addInputField("Habilidad 2:", curriculumData.skills?.[1] || "", "habilidad2", "text", loggedInUserId === curriculumData.userId));

  form.appendChild(skillsSection);

  // Botón de Enviar
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Actualizar Currículum";
  submitButton.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "mt-4",
    "rounded",
    "hover:bg-blue-700",
    "transition"
  );

  // Mostrar el botón solo si el usuario es el propietario del currículum
  if (loggedInUserId === curriculumData.userId) {
    form.appendChild(submitButton);
  }

  container.appendChild(form);

  // Manejar el evento de envío del formulario
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Solo permitir el envío si el usuario es el propietario
    if (loggedInUserId !== curriculumData.userId) {
      alert("No tienes permisos para actualizar este currículum.");
      return;
    }

    const formData = new FormData(form); // Crear un FormData para enviar archivos

    try {
      const response = await fetch(`http://localhost:4000/todos/update/${curriculumId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("Currículum actualizado con éxito.");
        location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("Error al actualizar el currículum. Por favor, intenta de nuevo.");
    }
  });

  return container;
};
