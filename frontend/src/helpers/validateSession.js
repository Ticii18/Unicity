export async function validateSession() {
  try {
    const response = await fetch('http://localhost:4000/auth/session', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      return { 
        valid: true, 
        userId: data.userId,
        username: data.username // Cambiado de userName a username
      };
    } else if (response.status === 403) {
      console.log('Sesión no válida o expirada');
      return { valid: false };
    } else {
      console.error('Error inesperado al validar la sesión:', response.statusText);
      return { valid: false };
    }
  } catch (error) {
    console.error('Error al validar la sesión:', error);
    return { valid: false };
  }
}