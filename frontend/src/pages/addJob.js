export const curriculumPage = () => {
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

  // Crear el formulario
  const form = document.createElement("form");
  form.classList.add("max-w-4xl", "mx-auto", "p-6", "bg-white", "rounded-lg", "shadow-lg");
  form.id = "curriculumForm";

  // Encabezado
  const header = document.createElement("header");
  header.classList.add("bg-blue-600", "text-white", "py-6");
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("container", "mx-auto", "text-center");

// Manejar la subida de la foto de perfil
  const fotoLabel = document.createElement("label");
  fotoLabel.setAttribute("for", "fotoPerfil");
  fotoLabel.classList.add("block", "mb-2", "text-lg", "font-bold");
  fotoLabel.textContent = "Subir Foto de Perfil:";

  const fotoInput = document.createElement("input");
  fotoInput.type = "file";
  fotoInput.id = "fotoPerfil";
  fotoInput.name = "profilePhoto"; // Cambiado el name a "image" para que coincida con multer
  fotoInput.accept = "image/*"; // Asegúrate de que solo se acepten imágenes
  fotoInput.classList.add(
    "block",
    "mx-auto",
    "p-2",
    "border-2",
    "border-gray-300",
    "rounded-lg",
    "bg-white",
    "text-gray-600"
  );

  // Nombre de Usuario
  const nombre = document.createElement("h1");
  nombre.classList.add("text-4xl", "font-bold", "mt-6");
  nombre.textContent = "Nombre Completo";

  const nombreInput = document.createElement("input");
  nombreInput.type = "text";
  nombreInput.placeholder = "Escribe tu nombre";
  nombreInput.name = "nombre"; // Añadir atributo "name" para enviar en el fetch
  nombreInput.classList.add(
    "block",
    "mx-auto",
    "mt-4",
    "p-2",
    "w-1/2",
    "border-2",
    "border-gray-300",
    "rounded-lg",
    "text-gray-600"
  );

// Lista desplegable para las profesiones traída desde la base de datos
  const profesionLabel = document.createElement("label");
  profesionLabel.textContent = "Selecciona tu profesión:";
  profesionLabel.classList.add("block", "mb-2", "text-lg", "font-bold");

  // un placeholder sin valor para mostrar el mensaje de que seleccione su oficio
  const optionHolder = document.createElement("option");
  optionHolder.textContent = "seleccionar profesión"
  optionHolder.value = ""
  optionHolder.disabled = true
  optionHolder.selected = true

  
  const profesionSelect = document.createElement("select");
  profesionSelect.name = "profesion";
  profesionSelect.classList.add(
    "block", "mx-auto", "p-2", "border-2", "border-gray-300",
    "rounded-lg", "bg-white", "text-gray-600", "m-6"
  );

  // función que trae las profesiones desde la base de datos
  const cargarProfesiones = async () => {
    try {
      const response = await fetch("http://localhost:4000/professions/trabajos", { method: "GET" });
      const profesiones = await response.json();

      profesiones.forEach((profesion) => {
        const option = document.createElement("option");
        option.value = profesion._id;
        option.textContent = profesion.profession;
        profesionSelect.appendChild(option);
      });

      // opción para "Otros"
      const otherOption = document.createElement("option");
      otherOption.value = "otros";
      otherOption.textContent = "Otros";
      profesionSelect.appendChild(otherOption);
    } catch (error) {
      console.error("Error al cargar las profesiones:", error);
    }
  };
  // renderizado de las profesiones en la lista desplegable
  cargarProfesiones();

  const otherProfessionInput = document.createElement("input");
  otherProfessionInput.type = "text";
  otherProfessionInput.name = "otherProfession";
  otherProfessionInput.placeholder = "Escribe tu profesión";
  otherProfessionInput.classList.add("block", "mt-2", "p-2", "border-2", "border-gray-300", "rounded-lg", "text-black");
  otherProfessionInput.style.display = "none";  // input inicialmente oculto

  // Mostrar/ocultar input según la selección del usuario
  profesionSelect.addEventListener("change", (event) => {
    if (event.target.value === "otros") {
      otherProfessionInput.style.display = "block";
    } else {
      otherProfessionInput.style.display = "none";
    }
  });

  
  // Agregar los elementos al div del header
  form.appendChild(profesionSelect);
  profesionSelect.appendChild(optionHolder)
  headerDiv.appendChild(fotoLabel);
  headerDiv.appendChild(fotoInput);
  headerDiv.appendChild(nombre);
  headerDiv.appendChild(nombreInput);
  headerDiv.appendChild(profesionLabel)
  headerDiv.appendChild(otherProfessionInput);
  headerDiv.appendChild(profesionSelect)
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

  const addInputField = (labelText, placeholder, name, type = "text") => {
    const div = document.createElement("div");
    div.classList.add("mt-4");

    const label = document.createElement("label");
    label.classList.add("font-semibold", "text-gray-700");
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
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

    div.appendChild(label);
    div.appendChild(input);

    return div;
  };

  personalInfoSection.appendChild(addInputField("Correo:", "Escribe tu correo", "correo", "email"));
  personalInfoSection.appendChild(addInputField("Teléfono:", "Escribe tu teléfono", "telefono", "tel"));
  personalInfoSection.appendChild(addInputField("LinkedIn:", "Escribe tu perfil de LinkedIn", "linkedin"));
  personalInfoSection.appendChild(addInputField("Sitio web:", "Escribe tu sitio web", "sitioWeb", "url"));

  form.appendChild(personalInfoSection);

  // Experiencia Profesional
  const experienceSection = document.createElement("section");
  experienceSection.classList.add(
    "bg-white",
    "shadow-lg",
    "rounded-lg",
    "p-6",
    "mt-6",
    "mx-4",
    "md:mx-auto",
    "max-w-4xl"
  );

  const experienceTitle = document.createElement("h2");
  experienceTitle.classList.add("text-2xl", "font-bold", "text-gray-700");
  experienceTitle.textContent = "Experiencia Profesional";
  experienceSection.appendChild(experienceTitle);

  experienceSection.appendChild(addInputField("Empresa:", "Nombre de la empresa", "empresa"));
  experienceSection.appendChild(addInputField("Duración:", "Duración del empleo", "duracion"));
  experienceSection.appendChild(addInputField("Descripción del Puesto:", "Descripción de tus funciones", "descripcionPuesto"));

  form.appendChild(experienceSection);

  // Información de la Empresa
  const companyInformation = document.createElement("section");
  companyInformation.classList.add(
    "bg-white",
    "shadow-lg",
    "rounded-lg",
    "p-6",
    "mt-6",
    "mx-4",
    "md:mx-auto",
    "max-w-4xl"
  );

  const companyTitle = document.createElement("h2");
  companyTitle.classList.add("text-2xl", "font-bold", "text-gray-700");
  companyTitle.textContent = "Información de la empresa";
  companyInformation.appendChild(companyTitle);

  companyInformation.appendChild(addInputField("Número de Teléfono:", "Número de la empresa", "numCompany"));
  companyInformation.appendChild(addInputField("Correo de contacto:", "correo electrónico de la empresa", "email"));
  companyInformation.appendChild(addInputField("Sitio web:", "sitio web de la empresa", "website"));

  form.appendChild(companyInformation);

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

  skillsSection.appendChild(addInputField("Habilidad 1:", "Escribe tu primera habilidad", "habilidad1"));
  skillsSection.appendChild(addInputField("Habilidad 2:", "Escribe tu segunda habilidad", "habilidad2"));

  form.appendChild(skillsSection);
  const spinnerSVG = `
  <p>Cargando...</p>`;
  // Botón de Enviar
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Guardar Currículum";
  submitButton.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "mt-4",
    "rounded",
    "hover:bg-blue-700",
    "transition",
    "disabled:bg-red-500"
  );

  form.appendChild(submitButton);
  container.appendChild(form);

  // Manejar el evento de envío del formulario
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form); // Crear un FormData para enviar archivos
    const userId = localStorage.getItem("userId"); // Asegúrate de que esto sea correcto
    
    submitButton.setAttribute("disabled", true);
    submitButton.innerHTML = spinnerSVG; // Usar el spinner de Bootstrap o Tailwind
  
    try {
      
      const response = await fetch(`http://localhost:4000/todos/add/${userId}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        alert("Currículum guardado con éxito.");
        window.location.pathname = "/"; // Redirigir a la página de vista de detalles
        // Aquí puedes redirigir o actualizar la vista
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    }catch (error) {
      alert("Error al cargar imagen(es).");
      console.error("Error:", error);
    }finally {
      // Restaurar el botón después de la operación
      await submitButton.removeAttribute("disabled");
      submitButton.textContent = "Guardar currículum"; // Restaurar el texto del botón
    }
  });

  return container;
};