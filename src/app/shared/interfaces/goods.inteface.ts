import { ICategoryResponse } from '../interfaces/category.interface';

export interface IGoodsRequest {
  category: ICategoryResponse;
  name: string;
  ingredients: string;
  addInfo?: string;
  proteins?: number;
  fats?:number;
  carbohydrates?:number;
  weight?:number;
  price: number;
  image: string;
  count: number;
}
export interface IGoodsResponse extends IGoodsRequest {
  id: number | string;
}
