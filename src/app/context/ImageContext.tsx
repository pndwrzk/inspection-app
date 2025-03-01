"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { getImages, postImages,deleteImage as removeImage } from "../services/InspectionService";
import { ImageData, ImagesUpload } from "@/app/types/image";
import { AlertInformation } from "../components/commons/AlertInformation";



interface ImageContextType {
  images: ImageData[];
  addImage: (images: ImagesUpload[]) => Promise<ImageData[]>;
  updateImage: (imageId: string, newUrl: string) => void;
  deleteImage: (imageId: number) => void;
  page: number;
  sizePage: number;
  setPage: (page: number) => void;
  setSearch: (q: string) => void;
  totalPage: number;
 
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sizePage, setSizePage] = useState<number>(12);
  const [search, setSearch] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);

  async function fetchImages() {
      const response = await getImages({ page, page_size: sizePage ,search});
      setImages(response.data);
      setTotalPage(response.meta?.total_page || 0);
  }

  useEffect(() => {
    fetchImages();
  }, [page,search,sizePage]);

  const addImage = async (images: ImagesUpload[]): Promise<ImageData[]> => {
    const response = await postImages(images);
    await fetchImages();
    AlertInformation(response.message, response.data!==null);
    return response.data;
  };

  const updateImage = async (imageId: string, newUrl: string) => {};

  const deleteImage = async (imageId: number) => {
    const response = await removeImage(imageId);
    await fetchImages();
    AlertInformation(response.message, response.data!==null);
  };

  const value = useMemo(
    () => ({
      images,
      addImage,
      updateImage,
      deleteImage,
      page,
      sizePage,
      setPage,
      setSizePage,
      setSearch,
      totalPage,
      
    }),
    [images, page, sizePage]
  );

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
}

export function useImage() {
  const context = useContext(ImageContext);
  if (!context) throw new Error("useImage must be used within ImageProvider");
  return context;
}
