// Desactivar el prerenderizado para esta ruta API
export const prerender = false;

// Importar la función para agregar un alumno a Firebase
import { addAlumno as addAlumnoToFirebase } from "../../firebase/firebaseService";

// Definir el manejador POST para esta ruta API
export async function post({ request }: { request: Request }) {
  try {
    // Parsear el cuerpo JSON de la solicitud
    const body = await request.json();
    const { name, grade, email, phone, status } = body;

    // Llamar a la función para agregar el alumno a Firebase
    await addAlumnoToFirebase(name, grade, email, phone, status);

    // Retornar una respuesta de éxito
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Registrar el error y retornar una respuesta de fallo
    console.error("Error en el endpoint:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}