import { ICategoryResponse } from '../interfaces/category.interface';

export interface IGoodsRequest {
  category: ICategoryResponse;
  name: string;
  ingredients: string;
  weight: number;
  price: number;
  image: string;
  count: number;
}
export interface IGoodsResponse extends IGoodsRequest {
  id: number | string;
}
