import { ICategoryResponse } from '../interfaces/category.interface';

export interface IGoodsRequest {
  category: ICategoryResponse;
  name: string;
  ingredients: string;
  proteins: number;
  fats:number;
  carbohydrates:number;
  price: number;
  image: string;
  count: number;
}
export interface IGoodsResponse extends IGoodsRequest {
  id: number | string;
}
