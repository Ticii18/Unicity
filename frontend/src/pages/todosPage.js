export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "min-h-screen", // para que ocupe toda la pantalla
    "bg-gray-200",
    "relative",
    "p-4" 
  );
    // Crear el botón "Logout"
    const btnLogout = document.createElement("button");
    btnLogout.textContent = "Logout";
    btnLogout.classList.add(
      "absolute",
      "top-4",
      "left-4",
      "bg-red-500",
      "text-white",
      "p-2",
      "rounded",
      "hover:bg-red-600"
    );
    btnLogout.addEventListener("click", async () => {
      const response = await fetch("http://localhost:4000/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        window.location.pathname = "/";
      }
    });

  // Crear el botón "Home"
  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-2xl", "font-bold", "mb-4", "text-center"); 
  title.textContent = "List of tasks";

  const tableWrapper = document.createElement("div");
  tableWrapper.classList.add(
    "w-full",
    "overflow-x-auto"
  );

  const table = document.createElement("table");
  table.classList.add(
    "min-w-full", 
    "bg-white",
    "shadow-md",
    "rounded-lg" 
  );

  // Crear el botón "+" para agregar una tarea dentro de la tabla
  const btnAddTask = document.createElement("button");
  btnAddTask.textContent = "Agregar Tarea";
  btnAddTask.classList.add(
    "absolute",
    "top-4",
    "right-4",
    "bg-green-500",
    "text-white",
    "p-3", 
    "rounded-full",
    "hover:bg-green-600",
    "shadow-lg", 
    "text-2x", 
    "transition",
    "duration-300",
    "ease-in-out",
    "focus:outline-none" 
  );
  btnAddTask.addEventListener("click", () => {
    window.location.pathname = "/todos/add";
  });

  const thead = document.createElement("thead");
  thead.classList.add("bg-gray-100");

  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2", "text-left");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2", "text-left");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2", "text-left");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2", "text-left");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2", "text-left");
  th5.textContent = "Actions";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnLogout); // Agregar el botón Logout
  container.appendChild(btnHome);
  container.appendChild(title);
  tableWrapper.appendChild(table); 
  container.appendChild(tableWrapper);
  table.appendChild(btnAddTask); 

  // Modal para editar tarea
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "bg-black",
    "bg-opacity-50",
    "flex",
    "items-center",
    "justify-center",
    "hidden"
  );

  const modalContent = document.createElement("div");
  modalContent.classList.add("bg-white", "p-4", "rounded", "shadow-lg", "w-96");

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Editar Tarea";
  modalTitle.classList.add("text-xl", "font-bold", "mb-4");

  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.classList.add("border", "w-full", "p-2", "mb-4");

  const inputCompleted = document.createElement("input");
  inputCompleted.type = "checkbox";
  const labelCompleted = document.createElement("label");
  labelCompleted.textContent = "Completado";

  const btnSave = document.createElement("button");
  btnSave.textContent = "Guardar";
  btnSave.classList.add("bg-blue-500", "text-white", "p-2", "rounded", "hover:bg-blue-600");

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(inputTitle);
  modalContent.appendChild(labelCompleted);
  modalContent.appendChild(inputCompleted);
  modalContent.appendChild(btnSave);
  modal.appendChild(modalContent);
  container.appendChild(modal);

  const putTask = (task) => {
    inputTitle.value = task.title;
    inputCompleted.checked = task.completed;
    modal.classList.remove("hidden");

    // Guardar los cambios
    btnSave.onclick = () => {
      const updatedTask = {
        title: inputTitle.value,
        completed: inputCompleted.checked,
      };

      // Realizar la solicitud PUT para actualizar la tarea
      fetch(`http://localhost:4000/todos/put/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, 
        },
        credentials: "include", 
        body: JSON.stringify(updatedTask),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar la tarea");
          }
          return response.json();
        })
        .then(() => {
          modal.classList.add("hidden");
          location.reload(); 
          window.alert("La tarea fue editada correctamente!")
        })
        .catch((error) => {
          console.error("Error al actualizar la tarea:", error);
        });
    };
  };

  // Función para eliminar la tarea
  const deleteTask = (taskId) => {
    fetch(`http://localhost:4000/todos/delete/${taskId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, 
      },
      credentials: "include", 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la tarea");
        }
        return response.json();
      })
      .then(() => {
        window.alert("Se ha eliminado correctamene la tarea")
        location.reload(); 
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea:", error);
      });
  };

  // Verifica que el userId esté presente en el almacenamiento local
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID no encontrado en el almacenamiento local.");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Error: User ID no encontrado.";
    container.appendChild(errorMessage);
    return container;
  }

  // Obtén las tareas del usuario
  fetch(`http://localhost:4000/todos/${userId}`, {
    method: "GET",
    credentials: "include", // Asegúrate de incluir las cookies de sesión
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((data) => {
      if (data.todos.length === 0) {
        const noTasksMessage = document.createElement("p");
        noTasksMessage.textContent = "No tienes tareas.";
        container.appendChild(noTasksMessage);
      } else {
        data.todos.forEach((task) => {
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          td1.classList.add("border", "px-4", "py-2");
          td1.textContent = task.id;

          const td2 = document.createElement("td");
          td2.classList.add("border", "px-4", "py-2");
          td2.textContent = task.title;

          const td3 = document.createElement("td");
          td3.classList.add("border", "px-4", "py-2");
          td3.textContent = task.completed ? "Sí" : "No";

          const td4 = document.createElement("td");
          td4.classList.add("border", "px-4", "py-2");
          td4.textContent = task.owner;

          const td5 = document.createElement("td");

          // Crear el botón "Editar"
          const btnUpdate = document.createElement("button");
          btnUpdate.textContent = "Editar";
          btnUpdate.classList.add(
            "border",
            "border-indigo-500",
            "bg-indigo-500",
            "text-white",
            "rounded-md",
            "px-4",
            "py-2",
            "m-2",
            "transition",
            "duration-300",
            "ease-in-out",
            "hover:bg-indigo-600",
            "focus:outline-none"
          );

          // Crear el botón "Eliminar"
          const btnDelete = document.createElement("button");
          btnDelete.textContent = "Eliminar";
          btnDelete.classList.add(
            "border",
            "border-red-500",
            "bg-red-500",
            "text-white",
            "rounded-md",
            "px-4",
            "py-2",
            "m-2",
            "transition",
            "duration-300",
            "ease-in-out",
            "hover:bg-red-600",
            "focus:outline-none"
          );

          btnUpdate.addEventListener("click", () => {
            putTask(task);
          });

          btnDelete.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
              deleteTask(task.id);
            }
          });

          td5.appendChild(btnUpdate);
          td5.appendChild(btnDelete);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tbody.appendChild(tr);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Error al cargar las tareas.";
      container.appendChild(errorMessage);
    });

  return container;
};
