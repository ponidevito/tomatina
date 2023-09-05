export interface ICategory {
  id: number | string;
    name: string;
    path: string; 
    image:string;
  }
  
  export interface ICategoryRequest {
    name: string;
    path: string;  
    image:string;
  }
  
  export interface ICategoryResponse extends ICategoryRequest {
    id: number | string;
  }
  