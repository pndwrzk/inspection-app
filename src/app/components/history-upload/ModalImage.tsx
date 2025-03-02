import {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
  } from "react";
  import { BsXLg } from "react-icons/bs";
  import type { ImageData, UpdateName } from "@/app/types/image";
  import { useImage } from "@/app/context/ImageContext";
  import { useForm } from "react-hook-form";
  
  type ModalProps = {
    title: string;
    image?: ImageData;
  };
  
  export type ModalHandle = {
    open: () => void;
    close: () => void;
  };
  
  const Modal = forwardRef<ModalHandle, ModalProps>(({ title, image }, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const { updateImage } = useImage();
    const [cursorPos, setCursorPos] = useState({ x: 0 });
    const [isOpen, setIsOpen] = useState(false);
    const [isEditName, setIsEditName] = useState(false);
  
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<UpdateName>();
  
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
      setIsOpen(false);
      setIsEditName(false);
      setValue("name", image?.name || "");
      modalRef.current?.close();
    };
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { offsetX, target } = e.nativeEvent;
      const x = (offsetX / (target as HTMLDivElement).offsetWidth) * 100;
      setCursorPos({ x });
    };
  
    const onSubmit = async (data: UpdateName) => {
      if (!image?.id) return;
  
      await updateImage(image.id, data.name);
      setIsOpen(false);
      setIsEditName(false);
      modalRef.current?.close();
    };
  
    useEffect(() => {
      if (isOpen) {
        modalRef.current?.showModal();
        return
      } 
        modalRef.current?.close();
      
    }, [isOpen]);
  
    return (
      <dialog
        ref={modalRef}
        onClick={closeModal}
        className={`rounded-2xl shadow-xl w-[600px] max-w-full backdrop:bg-black/50 transition-all duration-500 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-4 rounded-2xl"
        >
          <div className="flex justify-between items-center border-b px-5 py-3 bg-[#F3F4F6]">
            <h2 className="text-lg font-semibold text-gray-800">Detail Image</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-800 p-1 outline-none"
            >
              <BsXLg strokeWidth={2} size={20} />
            </button>
          </div>
  
          {image && (
            <div className="flex flex-col px-5 pt-2 pb-5 bg-white">
              <div
                className="relative overflow-hidden rounded-2xl"
                onMouseMove={handleMouseMove}
              >
                <img
                  src={image.url}
                  alt={title}
                  className="w-full h-[300px] cursor-pointer object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-110"
                  style={{
                    transformOrigin: `${cursorPos.x}% center`,
                  }}
                />
              </div>
  
              <div className="flex flex-row gap-2 pt-5">
                <div className="w-[80%]">
                  <input
                    type="text"
                    {...register("name", { required: "Image name is required" })}
                    defaultValue={image.name}
                    disabled={!isEditName}
                    className="p-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="w-[20%]">
                  <button
                    onClick={
                      isEditName
                        ? handleSubmit(onSubmit)
                        : () => setIsEditName(true)
                    }
                    className={`px-4 py-[6px] ${
                      isEditName
                        ? "bg-[#9F0504] hover:bg-red-700 text-white"
                        : "bg-white text-[#9F0504] border-2 border-[#9F0504]"
                    } rounded-lg w-full`}
                  >
                    {isEditName ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    );
  });
  
  Modal.displayName = "Modal";
  
  export default Modal;