import { ApiResponse } from "@/app/types/index";

export type ImagesUpload = {
    name : string
    image : string
}


export type UpdateName = {
    name : string
}
export type ImagesResponse = ApiResponse & {
    data: ImageData[];
    meta?: {
    limit: number;
    offset: number;
    total_page: number;
    }
  };

  export type ImageResponse = ApiResponse & {
    data: ImageData| null;
  };
  

  export type ImageData = {
    id : number
    name : string
    url : string
    created_at : string
    updated_at : string
  }
  
