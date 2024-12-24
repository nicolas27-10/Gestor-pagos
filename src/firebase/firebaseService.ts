import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function fetchTestData() {
    const querySnapshot = await getDocs(collection(db, "testCollection"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
}

fetchTestData();

export interface Alumno {
    id?: string;
    nombre: string;
    grado: string;
    email: string;
    telefono: string;
    status: string;
}

export async function addAlumno(nombre: string, grado:string, email: string, telefono: string, status: string): Promise<void> {
    const alumno: Alumno = {
        nombre,
        grado,
        email,
        telefono,
        status,
    };
    await addDoc(collection(db, "alumnos"), alumno);
}

// Función para recuperar todos los alumnos
export async function getAlumnos(): Promise<Alumno[]> {
    const alumnosCollection = collection(db, "alumnos");
    const alumnosSnapshot = await getDocs(alumnosCollection);
    const alumnosList: Alumno[] = [];

    // Recorrer los documentos y agregar los datos al array
    alumnosSnapshot.forEach((doc) => {
        const alumnoData = doc.data() as Alumno; // Asegúrate de que Alumno esté definido
        alumnosList.push({ id: doc.id, ...alumnoData }); // Agregar el ID del documento
    });

    return alumnosList; // Retornar el array de alumnos
}


// addAlumno("Cristobal Inayado", "2do Dan", "cristobal.i.carvajal@gmail.com", "9 6161 9091", "Activo");