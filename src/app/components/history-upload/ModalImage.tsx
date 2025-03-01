import { forwardRef, useImperativeHandle, useRef } from "react";
import { BsXLg } from "react-icons/bs";

type ModalProps = {
  title: string;
  image?: string;
};

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(({ title, image }, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.showModal(),
    close: () => modalRef.current?.close(),
  }));

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    modalRef.current?.close();
  };

  return (
    <dialog
      ref={modalRef}
      onClick={closeModal}
      className="p-5 bg-white rounded-2xl shadow-xl w-[500px] max-w-full backdrop:bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800 p-1 outline-none"
          >
            <BsXLg strokeWidth={2} size={20} />
          </button>
        </div>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-[300px] object-cover rounded-lg shadow-md"
          />
        )}
      </div>
    </dialog>
  );
});

export default Modal;
