export function Footer() {
    const $footer = document.createElement('footer');

    $footer.classList.add("bg-blue-500", "text-white", "py-4");

    $footer.innerHTML = `
      <div class="container mx-auto text-center">
        <p>&copy; 2024 Unicity. Todos los derechos reservados.</p>
        <p>
          <a href="#" class="text-white hover:underline"
            >Política de privacidad</a
          >
          |
          <a href="#" class="text-white hover:underline"
            >Términos de servicio</a
          >
        </p>
      </div>
    ;
`
    return $footer;
  }