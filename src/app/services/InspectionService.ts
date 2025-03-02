
import { ImagesUpload, ImagesResponse,ImageResponse, UpdateName } from "../types/image";
import { PaggingParam } from "../types";
import axios from "axios";
import apiClient from "@/utils/AxiosConfig";

export async function postImages(
  bodyRequest: ImagesUpload[]
): Promise<ImagesResponse> {
  try {
    const response = await apiClient.post<ImagesResponse>(
      `/images`,
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
      const response = await apiClient.get<ImagesResponse>(
        `/images?page=${params.page}&page_size=${params.page_size}&q=${params.search}`,
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
       const response = await apiClient.delete<ImageResponse>(
         `/images/${id}`,
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



   export async function updateNameIamge(
    id : number,
    bodyRequest: UpdateName
   ): Promise<ImageResponse> {
     try {
       const response = await apiClient.patch<ImageResponse>(
         `/images/${id}`,
         bodyRequest,
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