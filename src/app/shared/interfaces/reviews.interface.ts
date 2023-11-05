export interface IReview {
    id: number | string;
    firstName: string,
    lastName:string,
    selectedStreet: string,
    rating: string,
    email: string,
    review: string,
    fileUpload: string,
    image: string,
    date: string,
    count: number | string;

  }
  
  export interface IReviewRequest {
    firstName: string,
    lastName:string,
    selectedStreet: string,
    rating: string,
    email: string,
    review: string,
    fileUpload: string,
    image: string,
    date: string,
    count: number;
  }
  
  export interface IReviewResponse extends IReviewRequest {
    id: number | string;
  }
  