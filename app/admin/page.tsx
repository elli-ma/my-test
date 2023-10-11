"use client";
import React, { useState, useEffect } from "react";

export default function Admin() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageBase64 = (e.target as FileReader).result as string;
        try {
          const savedImages = JSON.parse(
            localStorage.getItem("userImages") || "[]"
          );
          savedImages.push(imageBase64);
          localStorage.setItem("userImages", JSON.stringify(savedImages));
        } catch (error) {
          console.error("Ошибка при разборе JSON:", error);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    try {
      const savedImages = JSON.parse(
        localStorage.getItem("userImages") || "[]"
      );
      if (savedImages.length > 0) {
        const latestImage = savedImages[savedImages.length - 1];
        setSelectedFile(null);
        setImagePreview(latestImage);
      }
    } catch (error) {
      console.error("Ошибка при разборе JSON:", error);
    }
  }, []);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-3xl m-10 pb-10 text-center">Загрузить фото</h1>
      <div className="container m-auto flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <label className="">
            <span className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-4 rounded-lg shadow-md m-2">
              Выбрать файл
              <input
                type="file"
                className="hidden w-full"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </span>
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md m-2"
          >
            Загрузить
          </button>
        </form>
        <h2 className="text-2xl m-10 pb-10 text-center">
          Предварительный просмотр:
        </h2>
        {imagePreview && (
          <div className="">
            <img
              className="w-full h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105"
              src={imagePreview}
              alt="Предварительный просмотр"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
