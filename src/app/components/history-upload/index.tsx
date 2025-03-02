"use client";
import { useRef, useState, useCallback } from "react";
import Modal from "./ModalImage";
import AlertDialog, {
  AlertDialogHandle,
} from "@/app/components/commons/AlertDialog";
import { useImage } from "@/app/context/ImageContext";

import { ImageData } from "@/app/types/image";
import ImageCard from "./ImageCard";
import Pagination from "./PaginationImage";

const DEFAULT_ID_SELECTED = 0;
const SEARCH_DEBOUNCE_DELAY = 1000;

export default function HistoryUpload() {
  const dialogRef = useRef<AlertDialogHandle>(null);
  const modalRef = useRef<{ open: () => void; close: () => void }>(null);

  const [selectedImage, setSelectedImage] = useState<ImageData | undefined>(
    undefined
  );
  const [idSelected, setIdSelected] = useState(DEFAULT_ID_SELECTED);

  const {
    images,
    setSearch,
    deleteImage,
    page,
    setPage,
    totalPage,
    isLoading,
  } = useImage();

  const openImageModal = useCallback((data: ImageData) => {
    setSelectedImage(data);
    modalRef.current?.open();
  }, []);

  const openDeleteConfirmation = useCallback((id: number) => {
    dialogRef.current?.open();
    setIdSelected(id);
  }, []);

  const confirmDeleteImage = useCallback(async () => {
    await deleteImage(idSelected);
    dialogRef.current?.close();
    setIdSelected(DEFAULT_ID_SELECTED);
  }, [deleteImage, idSelected]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTimeout(() => {
        setSearch(value);
      }, SEARCH_DEBOUNCE_DELAY);
    },
    [setSearch]
  );

  const hasImages = images?.length > 0;

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
              placeholder="Search..."
              className="p-2 border rounded-lg w-full sm:w-[250px] md:w-[300px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onChange={handleSearch}
            />
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {isLoading ? (
              <div className="col-span-full text-center text-gray-500 mt-5 h-[150px]">
                <h3>Loading...</h3>
              </div>
            ) : hasImages ? (
              images.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  onImageClick={openImageModal}
                  onTrashClick={openDeleteConfirmation}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 mt-5 h-[150px]">
                <h3>
                  No image history found. Upload images to keep a record of your
                  inspection photos.
                </h3>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </div>
      </div>

      <Modal ref={modalRef} title="Image Details" image={selectedImage} />
      <AlertDialog
        ref={dialogRef}
        title="Delete Image"
        description="Are you sure you want to delete this image?"
        onConfirm={confirmDeleteImage}
      />
    </>
  );
}
