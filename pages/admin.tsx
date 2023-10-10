"use client";
import React, { useState, useEffect } from "react";

const Admin: React.FC = () => {
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
      // Выполните загрузку файла на сервер или другую обработку.
      console.log("Selected File:", selectedFile);

      // Сохраняем изображение в локальном хранилище при выборе
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
    // Получаем данные из localStorage при загрузке компонента
    try {
      const savedImages = JSON.parse(
        localStorage.getItem("userImages") || "[]"
      );
      if (savedImages.length > 0) {
        const latestImage = savedImages[savedImages.length - 1];
        // Устанавливаем Base64-кодированное изображение для предварительного просмотра
        setSelectedFile(null); // Очищаем выбранное изображение
        setImagePreview(latestImage);
      }
    } catch (error) {
      console.error("Ошибка при разборе JSON:", error);
    }
  }, []);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-red">Загрузить фото</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
        >
          Загрузить
        </button>
      </form>
      {imagePreview && (
        <div>
          <h2>Предварительный просмотр:</h2>
          <img
            src={imagePreview}
            alt="Предварительный просмотр"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
