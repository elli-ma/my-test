"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Gallery: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imagesFromLocalStorage, setImagesFromLocalStorage] = useState<
    string[]
  >([]);

  useEffect(() => {
    // Получаем данные из localStorage
    const savedImagesString = localStorage.getItem("userImages");
    if (savedImagesString) {
      // Преобразуем JSON-строку обратно в массив изображений
      const savedImages: string[] = JSON.parse(savedImagesString);
      setImagesFromLocalStorage(savedImages);
    }
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl m-10 pb-10 text-center">ГАЛЕРЕЯ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagesFromLocalStorage.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Image ${index}`}
              className="w-full h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105 "
              onClick={() => openModal(image)}
            />
            <div
              className="hidden group-hover:flex absolute inset-0 items-center justify-center bg-black bg-opacity-60 text-white text-lg cursor-pointer"
              onClick={() => openModal(image)}
            >
              Нажмите, чтобы увеличить
            </div>
          </div>
        ))}{" "}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black z-40"
      >
        <img
          src={selectedImage}
          alt="Selected Image"
          className="max-w-full max-h-full"
        />
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white text-xl cursor-pointer"
        >
          ЗАКРЫТЬ
        </button>
      </Modal>
    </div>
  );
};

export default Gallery;
