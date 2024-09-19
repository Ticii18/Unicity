export const registerPage = () => {
    const container = document.createElement("div");

    container.classList.add(
        "flex",
        "items-center",
        "justify-center",
        "h-screen",
        "bg-gray-200"
    );

    const form = document.createElement("form");

    form.classList.add(
        "w-full",
        "max-w-md",
        "bg-white",
        "p-6",
        "rounded",
        "shadow-md",
        "space-y-4",
        "md:w-1/3"
    );

    const title = document.createElement("h2");

    title.classList.add("text-2xl", "font-bold", "mb-4");
    title.textContent = "Register Form";

    const usernameInput = document.createElement("input");

    usernameInput.type = "text";
    usernameInput.id = "username";
    usernameInput.name = "username";
    usernameInput.required = true;
    usernameInput.classList.add(
        "w-full",
        "p-2",
        "border",
        "border-gray-300",
        "rounded"
    );
    usernameInput.placeholder = "Username";

    const emailInput = document.createElement("input");

    emailInput.type = "email";
    emailInput.id = "email";
    emailInput.name = "email";
    emailInput.required = true;
    emailInput.classList.add(
        "w-full",
        "p-2",
        "border",
        "border-gray-300",
        "rounded"
    );
    emailInput.placeholder = "Email";

    const passwordInput = document.createElement("input");

    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.name = "password";
    passwordInput.required = true;
    passwordInput.classList.add(
        "w-full",
        "p-2",
        "border",
        "border-gray-300",
        "rounded"
    );
    passwordInput.placeholder = "Password";

    const confirmPasswordInput = document.createElement("input");

    confirmPasswordInput.type = "password";
    confirmPasswordInput.id = "confirmPassword";
    confirmPasswordInput.name = "confirmPassword";
    confirmPasswordInput.required = true;
    confirmPasswordInput.classList.add(
        "w-full",
        "p-2",
        "border",
        "border-gray-300",
        "rounded"
    );
    confirmPasswordInput.placeholder = "Confirm Password";

    const submitButton = document.createElement("button");

    submitButton.type = "submit";
    submitButton.classList.add(
        "w-full",
        "bg-green-500",
        "hover:bg-green-700",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded"
    );
    submitButton.textContent = "Register";

    form.appendChild(title);
    form.appendChild(usernameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(confirmPasswordInput);
    form.appendChild(submitButton);

    const divError = document.createElement("div");
    divError.id = "message";
    form.appendChild(divError);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validación de campos
        if (!username || !email || !password || !confirmPassword) {
            divError.innerText = "Por favor, completa todos los campos.";
            divError.classList.add(
                "bg-danger",
                "text-white",
                "text-center",
                "rounded",
                "p-2",
                "mt-3"
            );
            return;
        }

        // Validación de contraseñas
        if (password !== confirmPassword) {
            divError.innerText = "Las contraseñas no coinciden.";
            divError.classList.add(
                "bg-danger",
                "text-white",
                "text-center",
                "rounded",
                "p-2",
                "mt-3"
            );
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                divError.innerText = errorData.message || "Error al registrarse.";
                divError.classList.add(
                    "bg-danger",
                    "text-red-800",
                    "text-center",
                    "rounded",
                    "p-2",
                    "mt-3"
                );
                return;
            }

            const data = await response.json();
            console.log(data);

            // Store user ID in localStorage
            localStorage.setItem("userId", data.userId);

            // Redirigir al login o página de tareas
            window.location.pathname = "/"; // Cambia según tus rutas
        } catch (error) {
            console.error("Error en el registro:", error);
            divError.innerText = "Error al registrarse.";
            divError.classList.add(
                "bg-danger",
                "text-white",
                "text-center",
                "rounded",
                "p-2",
                "mt-3"
            );
        }
    });

    container.appendChild(form);

    return container;
};
