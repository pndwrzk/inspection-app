"use client";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "./ModalImage";
import AlertDialog, {
  AlertDialogHandle,
} from "@/app/components/commons/AlertDialog";
import { useImage } from "@/app/context/ImageContext";

import { ImageData } from "@/app/types/image";

export default function HistoryUpload() {
  const dialogRef = useRef<AlertDialogHandle>(null);
  const modalRef = useRef<{ open: () => void; close: () => void }>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | undefined>(
    undefined
  );
  const [idSelected, setIdSelected] = useState(0);

  const { images, setSearch, deleteImage } = useImage();

  const handleImageClick = (data: ImageData) => {
    setSelectedImage(data);
    modalRef.current?.open();
  };

  const handleTrashClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    dialogRef.current?.open();
    setIdSelected(id);
  };

  const removeImage = async () => {
    await deleteImage(idSelected);
    dialogRef.current?.close();
    setIdSelected(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => {
      setSearch(value);
    }, 1000);
  };

  return (
    <>
      <div className="bg-white/80 mx-auto w-full max-w-screen-lg md:rounded-3xl shadow mt-10">
        <div className="flex flex-col h-full">
          {/* Sticky Header */}
          <div className=" top-0 p-4 border-b md:rounded-t-3xl bg-[#F3F4F6] flex flex-wrap gap-2 justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-800">
              History Upload
            </h3>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded-lg w-full sm:w-[250px] md:w-[300px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onChange={handleSearch}
            />
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {images?.map((item) => (
              <div
                key={item.id}
                onClick={() => handleImageClick(item)}
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <button
                  className="absolute top-1 right-1 text-gray-200 hover:text-white  p-1 flex items-center justify-center hover:font-bold z-10 pointer-events-auto"
                  aria-label="Cancel upload"
                  onClick={(e) => handleTrashClick(e, item.id)}
                >
                  <FaRegTrashAlt strokeWidth={2} size={20} />
                </button>
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <p className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-md text-center text-white font-medium transition hover:bg-opacity-60">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal ref={modalRef} title="My Modal" image={selectedImage} />
      <AlertDialog
        ref={dialogRef}
        title="Delete Image"
        description="Are you sure you want to delete this item?"
        onConfirm={removeImage}
      />
    </>
  );
}
