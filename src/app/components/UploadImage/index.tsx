"use client";
import { ImagesUpload } from "@/app/types/image";
import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { useForm, useFieldArray } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import ProgresBarUpload from "./ProgresBarUpload";
import { IMAGE_TYPE_LIST, MAX_SIZE_IMAGE } from "@/constants";
import { AlertInformation } from "@/app/components/commons/AlertInformation";

import { Loading } from "@/app/components/commons/Load";
import { useImage } from "@/app/context/ImageContext";

export default function UploadImage() {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addImage } = useImage();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ items: ImagesUpload[] }>({
    defaultValues: { items: [] },
  });

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      let currentProgress = progress;
      const randomCheck = Math.floor(Math.random() * 5 + 4) * 10;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);

        if (currentProgress === randomCheck) {
          if (file.size > MAX_SIZE_IMAGE) {
            AlertInformation("Maximum file size is 10MB.");
            setProgress(0);
            clearInterval(interval);
            return;
          }

          if (!IMAGE_TYPE_LIST.includes(file.type)) {
            AlertInformation("Only PNG, JPG, or JPEG files are allowed.");
            setProgress(0);
            clearInterval(interval);
            return;
          }
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          insert(0, {
            image: reader.result as string,
            name: "",
          });
          setProgress(0);
        }
      }, 200);
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: { items: ImagesUpload[] }) => {
    setIsLoading(true);
    await addImage(data.items);
    reset();

    setIsLoading(false);
  };

  return (
    <div className="bg-white/80 mx-auto w-full max-w-screen-lg md:rounded-3xl shadow z-10">
      <div className="flex flex-col md:flex-row w-full h-full md:h-[500px] overflow-hidden">
        <div className="w-full md:w-2/5 border-r p-4 md:p-8">
          <div className="flex flex-col  h-full">
            <div className="text-center">
              <h1 className="font-bold text-2xl">Upload Photo</h1>
              <p className="text-gray-500 text-sm mt-3">
                Upload unlimited photos to ensure detailed and accurate
                inspection reports.
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-lg">
                <label
                  className="flex flex-col items-center justify-center w-full h-64 md:h-80 px-4 bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none" // Sesuaikan tinggi untuk mobile
                  id="drop"
                  aria-label="File upload"
                >
                  <span className="flex flex-col items-center space-y-2 text-center">
                    <FaUpload size={50} className="mb-3" />
                    <h3 className="mt-2 text-md font-medium text-gray-900">
                      <label
                        htmlFor="input"
                        className="relative cursor-pointer"
                      >
                        <span>Drag and drop</span>
                        <span className="text-indigo-600"> or browse </span>
                        <span>to upload</span>
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </h3>
                  </span>
                  <input
                    type="file"
                    name="file_upload"
                    className="hidden"
                    id="input"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="w-full md:w-[60%] flex flex-col h-full ">
          <span className="w-full bg-[#F0F0F0] block sm:hidden py-3"></span>

          <div className=" top-0  p-2 border-y md:border-b md:rounded-tr-3xl bg-gray-100">
            <h3 className="font-semibold text-lg text-gray-800">Form Images</h3>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 min-h-0  overflow-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5 min-h-[200px]">
                <ProgresBarUpload progress={progress} />

                {!fields.length && !progress && (
                  <h3 className=" text-gray-500  text-center mt-5">
                  No images have been added yet. Start uploading to enhance your inspection report!
                  </h3>
                )}

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative w-full border p-4 rounded-lg flex flex-row  items-center gap-4 bg-white shadow-sm"
                  >
                    <button
                      onClick={() => remove(index)}
                      className="cursor-pointer absolute top-[5px] right-[5px]  text-gray-500 hover:text-black  outline-none p-1 flex items-center justify-center hover:font-bold" // Tambahkan kelas hover:font-bold
                      aria-label="Cancel upload"
                    >
                      <BsXLg strokeWidth={1} size={13} />
                    </button>

                    {/* Image Placeholder */}
                    <div className="w-16 h-16 flex items-center border-2 justify-center rounded-lg bg-gray-100  border-gray-800">
                      <img
                        src={field.image}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Input Field */}
                    <div className="flex-1">
                      <label
                        htmlFor={`image-name-${field.id}`}
                        className="block text-md font-bold mb-2 pl-1"
                      >
                        Label
                      </label>
                      <input
                        id={`image-name-${field.id}`}
                        type="text"
                        {...register(`items.${index}.name`, {
                          required: "Image name is required",
                        })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
                        placeholder="Enter image name"
                      />
                      {errors.items?.[index]?.name && (
                        <p className="text-[#9F0504] text-xs mt-1">
                          {errors.items[index].name.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {!!fields.length && (
                  <div className="mb-[170px] md:mb-0">
                    <button
                      type="submit"
                      className="w-full bg-[#9F0504] hover:bg-red-700 text-white font-bold py-2 mt-4 px-4 rounded-lg flex justify-center"
                    >
                      {isLoading ? <Loading /> : "Submit"}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
