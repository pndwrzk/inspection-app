"use client";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "./ModalImage";

export default function HistoryUpload() {
  const modalRef = useRef<{ open: () => void; close: () => void }>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const items = [
    "Hanging Planters",
    "Planter Stand with Pots",
    "Watering Cans",
    "Metal Planters",
    "Table Top Planters",
    "Wall Mounted Stands",
    "Jute Plant Pots",
    "Bird Feeders",
    "Garden Sticks",
  ];

  const imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB5q2wVs9oA9Ab5-8rC7vKjvHsSCLoF4G10w&s";

  const handleImageClick = () => {
    setSelectedImage(imageUrl);
    modalRef.current?.open();
  };

  const handleTrashClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Trash clicked");
  };

  return (
    <>
      <div className="bg-white/80 mx-auto w-full max-w-screen-lg md:rounded-3xl shadow mt-10">
        <div className="flex flex-col h-full">
          {/* Sticky Header */}
          <div className=" top-0 p-4 border-b md:rounded-t-3xl bg-[#F3F4F6] flex flex-wrap gap-2 justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-800">History Upload</h3>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded-lg w-full sm:w-[250px] md:w-[300px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {items.map((item) => (
              <div
                key={item}
                onClick={handleImageClick}
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <button
                  className="absolute top-1 right-1 text-white p-1 flex items-center justify-center hover:font-bold z-10 pointer-events-auto"
                  aria-label="Cancel upload"
                  onClick={handleTrashClick}
                >
                  <FaRegTrashAlt strokeWidth={2} size={20} />
                </button>
                <img src={imageUrl} alt={item} className="w-full h-48 object-cover" />
                <p className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-md text-center text-white font-medium transition hover:bg-opacity-60">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal ref={modalRef} title="My Modal" image={selectedImage} />
    </>
  );
}