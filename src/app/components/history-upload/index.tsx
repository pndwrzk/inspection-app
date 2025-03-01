"use client";
import { useRef, useState } from "react";
import Modal from "./ModalImage";
import AlertDialog, {
  AlertDialogHandle,
} from "@/app/components/commons/AlertDialog";
import { useImage } from "@/app/context/ImageContext";

import { ImageData } from "@/app/types/image";
import ImageCard from "./ImageCard";

export default function HistoryUpload() {
  const dialogRef = useRef<AlertDialogHandle>(null);
  const modalRef = useRef<{ open: () => void; close: () => void }>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | undefined>(
    undefined
  );
  const [idSelected, setIdSelected] = useState(0);

  const { images, setSearch, deleteImage, page, setPage, totalPage } =
    useImage();

  const handleImageClick = (data: ImageData) => {
    setSelectedImage(data);
    modalRef.current?.open();
  };

  const handleTrashClick = (id: number) => {
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
          <div className=" top-0 p-4 border-b md:rounded-t-3xl bg-[#F3F4F6] flex flex-wrap gap-2 justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-800">
              History Upload
            </h3>
            <input
              type="text"
              disabled={!images.length}
              placeholder="Search..."
              className="p-2 border rounded-lg w-full sm:w-[250px] md:w-[300px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onChange={handleSearch}
            />
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {images?.length ? (
              images.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  onImageClick={handleImageClick}
                  onTrashClick={handleTrashClick}
                />
              ))
            ) : (
              <div className="col-span-full text-center  text-gray-500 mt-5 h-[150px]">
               <h3>No image history found. Upload images to keep a record of your inspection photos.
               </h3>
              </div>
            )}
          </div>
          {totalPage > 1 && (
            <div className="w-full flex items-center justify-center py-6">
              <nav className="inline-flex items-center p-1 rounded bg-white space-x-2">
                <a
                  className="p-1 rounded border text-white bg-gray-800  hover:bg-black cursor-pointer"
                  onClick={() => page > 1 && setPage(page - 1)}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </a>
                <p className="text-gray-500">
                  Page {page} of {totalPage}
                </p>
                <a
                  className="p-1 rounded border text-white bg-gray-800  hover:bg-black cursor-pointer"
                  onClick={() => page < totalPage && setPage(page + 1)}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          )}
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
