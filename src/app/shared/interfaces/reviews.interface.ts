export interface IReview {
    id: number | string;
    firstName:string;
    lastName:string;
    selectedStreet:string;
    rating:string;
    review:string;    
  }
  
  export interface IReviewRequest {
    firstName:string;
    lastName:string;
    selectedStreet:string;
    rating:string;
    review:string;  
  }
  
  export interface IReviewResponse extends IReviewRequest {
    id: number | string;
  }
  