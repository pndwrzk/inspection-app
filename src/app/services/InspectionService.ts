import axios from "axios";
import { ImagesUpload, ImagesResponse,ImageResponse } from "../types/image";
import { PaggingParam } from "../types";

export async function postImages(
  bodyRequest: ImagesUpload[]
): Promise<ImagesResponse> {
  try {
    const response = await axios.post<ImagesResponse>(
      `${process.env.NEXT_PUBLIC_INSPECTION_SERVICE}/images`,
      bodyRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        status: "unknown error",
        message: "unknown error",
        data: [],
      };
    }
  }
}



export async function getImages(
   params : PaggingParam
  ): Promise<ImagesResponse> {
    try {
      const response = await axios.get<ImagesResponse>(
        `${process.env.NEXT_PUBLIC_INSPECTION_SERVICE}/images?page=${params.page}&page_size=${params.page_size}&q=${params.search}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      } else {
        return {
          status: "unknown error",
          message: "unknown error",
          data: [],
        };
      }
    }
  }



  export async function deleteImage(
    id : number
   ): Promise<ImageResponse> {
     try {
       const response = await axios.delete<ImageResponse>(
         `${process.env.NEXT_PUBLIC_INSPECTION_SERVICE}/images/${id}`,
       );
       return response.data;
     } catch (error) {
       if (axios.isAxiosError(error) && error.response) {
         return error.response.data;
       } else {
         return {
           status: "unknown error",
           message: "unknown error",
           data: null,
         };
       }
     }
   }
