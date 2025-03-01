export interface ApiResponse {
    status: string;
    message: string;
    
  }


export type PaggingParam ={
    page: number;
    page_size : number;
    search :string;
}