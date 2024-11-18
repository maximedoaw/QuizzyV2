"use client";

import { auth, firestore } from "@/firebase/clientApp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { categories } from "@/constant";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import ImageCropper from "./ImageCropper";
import useUploadFile from "@/hooks/useUploadFile";

const QuizzForm: React.FC = () => {

  const { uploadFile, progress, isUploading } = useUploadFile();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    quizzname: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("choose-img");

  // Gestion du changement de fichier
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCurrentPage("crop-img");
    }
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour gérer le changement de catégorie
  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!form.quizzname || !form.category) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!croppedImage) {
      toast.error("Please crop an image.");
      return;
    }

    setLoading(true);

    try {
      // Upload de l'image recadrée dans Firebase Storage
      const uploadedImageURL = await uploadFile(croppedImage, `quizzes/${form.quizzname}.jpg`);
      if (!uploadedImageURL) {
        toast.error("Failed to upload image.");
        return;
      }

      // Création du document dans Firestore
      const quizzDocRef = doc(firestore, "Quizz", form.quizzname);

      await runTransaction(firestore, async (transaction) => {
        const quizzDoc = await transaction.get(quizzDocRef);
        if (quizzDoc.exists()) {
          throw new Error("Quiz already exists");
        }

        transaction.set(quizzDocRef, {
          quizzName: form.quizzname,
          quizzImage: uploadedImageURL,
          createdAt: serverTimestamp(),
          duration: 60,
          category: form.category,
          numberOfQuestions: 10,
          numLike: 0,
          numDisLike: 0,
        });
      });
      
      setForm({
        quizzname: "",
        category: "",
      })
      setCroppedImage(null);
      toast.success("Quiz created successfully");
      
    } catch (error: any) {
      toast.error("An error occurred while creating the quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" >
      <form className="bg-white p-6 max-w-md w-full rounded-lg shadow-lg" onSubmit={(event) => event.preventDefault()}>
        <p className="text-xl font-semibold text-center mb-6">Create a New Quiz</p>

        {/* Upload Image Section */}
        {currentPage === "crop-img" && selectedFile ? (
          <div className="mb-4">
            <ImageCropper
              imageSrc={URL.createObjectURL(selectedFile)}
              onCropComplete={(cropped) => {
                setCroppedImage(cropped);
                setCurrentPage("preview");
              }}
            />
          </div>
        ) : currentPage === "preview" && croppedImage ? (
          <div className="flex flex-col items-center mb-4">
            <img
              src={croppedImage}
              alt="Cropped"
              className="w-64 h-64 object-cover rounded-lg shadow-md mb-4"
            />
            <button
              onClick={() => setCurrentPage("crop-img")}
              className="text-blue-500 underline text-sm"
            >
              Edit Image
            </button>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="w-64 h-64 border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer rounded-lg mb-4 mx-auto"
          >
            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            <p className="text-gray-600">Click or drag file to upload</p>
          </label>
        )}

        {/* Input pour le nom du quiz */}
        <input
          type="text"
          placeholder="Enter quiz name"
          className="w-full mb-4 p-4 border rounded-lg shadow-sm text-sm border-gray-300"
          name="quizzname"
          value={form.quizzname}
          onChange={handleCreate}
        />

        {/* Sélecteur pour la catégorie */}
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Bouton de soumission */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Create Quiz"}
        </button>

        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default QuizzForm;
