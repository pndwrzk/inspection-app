import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
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

  // Explicit typing for cursorPos state
  const [cursorPos, setCursorPos] = useState<{ x: number }>({ x: 0 });

  // Explicit typing for isOpen state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      modalRef.current?.showModal();
    },
    close: () => {
      setIsOpen(false);
      modalRef.current?.close();
    },
  }));

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false); // Trigger the closing animation
    modalRef.current?.close();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, target } = e.nativeEvent;
    const x = (offsetX / (target as HTMLDivElement).offsetWidth) * 100;
    setCursorPos({ x });
  };

  // Manage the modal open/close transition
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      onClick={(e) => {
        e.stopPropagation();
        closeModal(e);
      }}
      className={`p-5 bg-white rounded-2xl shadow-xl w-[500px] max-w-full backdrop:bg-black/50 transition-all duration-500 transform ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4">
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
          <div
            className="relative overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-[300px] cursor-pointer object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
              style={{
                transformOrigin: `${cursorPos.x}% center`, // Horizontal zoom based on cursor
              }}
            />
          </div>
        )}
      </div>
    </dialog>
  );
});

export default Modal;
