import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

import ExcelJS from 'exceljs';

export interface Alumno {
    id?: string;
    nombre: string;
    grado: string;
    email: string;
    telefono: string;
    status: string;
}

export async function addAlumno(nombre: string, grado: string, email: string, telefono: string, status: string): Promise<void> {
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

// Función para simular la búsqueda del alumno (puedes adaptarla a Firebase o tu lógica)
export async function getAlumnoById(alumnoId: string) {
    let alumnos: Alumno[] = [];

    // Recuperar los alumnos al cargar el componente
    try {
        alumnos = await getAlumnos();
    } catch (error) {
        console.error('Error al recuperar los alumnos:', error);
    }
    // Simula una lista local (reemplázala con datos reales)

    return alumnos.find((alumno) => alumno.id === alumnoId);
}

// Función para actualizar el alumno en Firebase
interface UpdatedAlumnoData {
    [key: string]: any;
    nombre?: string;
    grado?: string;
    email?: string;
    telefono?: string;
    status?: string;
}

export async function updateAlumno(alumnoId: string, updatedData: UpdatedAlumnoData): Promise<void> {
    const docRef = doc(db, "alumnos", alumnoId);
    await updateDoc(docRef, updatedData);
}

export async function deleteAlumno(alumnoId: string): Promise<void> {
    const docRef = doc(db, "alumnos", alumnoId);
    await deleteDoc(docRef);
}

// Función para generar el archivo Excel
export async function generarInformeAlumnos() {
    // Obtener la lista de alumnos
    const alumnos = await getAlumnos();
  
    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Alumnos');
  
    // Definir las columnas
    worksheet.columns = [
      { header: 'NOMBRE', key: 'nombre', width: 30 },
      { header: 'STATUS', key: 'status', width: 15 },
      { header: 'GRADO', key: 'grado', width: 15 },
      { header: 'EMAIL', key: 'email', width: 25 },
      { header: 'TELEFONO', key: 'telefono', width: 15 },
    ];
  
    // Agregar los datos (sin la columna `id`)
  alumnos.forEach(({ id, ...alumno }) => {
    // Reemplazar valores vacíos o nulos con "Sin información"
    const alumnoProcesado = Object.fromEntries(
      Object.entries(alumno).map(([key, value]) => [key, value || 'Sin información'])
    );
    worksheet.addRow(alumnoProcesado);
  });
  
    // Aplicar estilos a las cabeceras
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true }; // Negrita
      cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Centrado
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFCC' } }; // Fondo amarillo
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }; // Bordes
    });
  
    // Agregar bordes a todas las celdas
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Saltar cabeceras
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });
  
    // Generar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
  
    // Crear un blob para descargar el archivo
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
  
    // Crear un enlace para la descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Informe_Alumnos.xlsx';
    link.click();
  }


// addAlumno("Cristobal Inayado", "2do Dan", "cristobal.i.carvajal@gmail.com", "9 6161 9091", "Activo");