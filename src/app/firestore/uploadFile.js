// uploadFile.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Asegúrate de que esta ruta sea correcta

const uploadFileToFirebase = async (file, folder) => {
  if (!file) {
    console.error("No se ha seleccionado ningún archivo.");
    return null;
  }

  try {
    // Crea una referencia al archivo en Firebase Storage
    const storageRef = ref(storage, `evidencias/${folder}/${file.name}`);

    // Sube el archivo
    await uploadBytes(storageRef, file);

    // Obtiene la URL de descarga
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Archivo subido correctamente. URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export { uploadFileToFirebase };