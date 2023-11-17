export interface ICv {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  review: string;
  fileUpload: string;
  image: string;
  date: string;
  vacancie: string;
}

export interface ICvRequest {
  firstName: string;
  lastName: string;
  email: string;
  review: string;
  fileUpload: string;
  image: string;
  date: string;
  vacancie: string;
}

export interface ICvResponse extends ICvRequest {
  id: number | string;
}
