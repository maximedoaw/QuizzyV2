import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/clientApp"; // Assure-toi que c'est le bon chemin vers ton fichier de configuration Firebase

interface UseUploadFileResponse {
  uploadFile: (base64String: string, path: string) => Promise<string | null>; // Utilisation de string ici
  progress: number;
  isUploading: boolean;
  error: string | null;
}

const useUploadFile = (): UseUploadFileResponse => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour uploader une chaîne encodée en base64
  const uploadFile = async (base64String: string, path: string): Promise<string | null> => {
    if (!base64String) return null;

    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Extraire la partie base64 (après la virgule)
      const base64Data = base64String.split(",")[1];
      if (!base64Data) {
        throw new Error("Invalid base64 string");
      }

      // Convertir la chaîne base64 en un Blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      // Créer une référence de stockage pour Firebase
      const storageRef = ref(storage, `${path}/${Date.now()}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      // Gérer l'upload
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            console.error("Upload error:", error);
            setError(error.message);
            setIsUploading(false);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setIsUploading(false);
              resolve(downloadURL);
            } catch (err) {
              setError("Failed to get download URL");
              setIsUploading(false);
              reject(err);
            }
          }
        );
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file");
      setIsUploading(false);
      return null;
    }
  };

  return { uploadFile, progress, isUploading, error };
};

export default useUploadFile;
