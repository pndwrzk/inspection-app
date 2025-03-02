"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { getImages, postImages,deleteImage as removeImage, updateNameIamge } from "../services/InspectionService";
import { ImageData, ImagesUpload } from "@/app/types/image";
import { AlertInformation } from "../components/commons/AlertInformation";



interface ImageContextType {
  images: ImageData[];
  addImage: (images: ImagesUpload[]) => Promise<ImageData[]>;
  updateImage: (imageId: number, newName: string) => void;
  deleteImage: (imageId: number) => void;
  page: number;
  sizePage: number;
  setPage: (page: number) => void;
  setSearch: (q: string) => void;
  totalPage: number;
  isLoading: boolean;
 
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sizePage, setSizePage] = useState<number>(12);
  const [search, setSearch] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchImages = useCallback(async() => {
    setIsLoading(true);
    const response = await getImages({ page, page_size: sizePage ,search});
      setImages(response.data);
      setTotalPage(response.meta?.total_page || 0);
      setIsLoading(false);
      if(response.data === null){ 
        AlertInformation(response.message);
      }
  }, [page, search, sizePage]); 


  useEffect(() => {
    fetchImages();
  }, [fetchImages, page, search, sizePage]);
  

  const addImage = useCallback(async (images: ImagesUpload[]): Promise<ImageData[]> => {
    const response = await postImages(images);
    await fetchImages();
    AlertInformation(response.message, response.data!==null);
    return response.data;
  },[fetchImages]);

  const updateImage = useCallback(async (imageId: number, newName: string) => {
    const response = await updateNameIamge(imageId, { name: newName });
    await fetchImages();
    AlertInformation(response.message, response.data!==null);
  },[fetchImages]);

  const deleteImage = useCallback(async (imageId: number) => {
    const response = await removeImage(imageId);
    await fetchImages();
    AlertInformation(response.message, response.data!==null);
  },[fetchImages]);

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
      isLoading
    }),
    [images, addImage, updateImage, deleteImage, page, sizePage, totalPage, isLoading]
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
