export interface IOrders {
  id: number | string;
  selectedValue: string;
  selectedHolders: string;
  selectedInterval: string;
  selectedPickup: string;
  date: string;
  productName: string;
  cash: string;
  delivery: string;
  inAdvance: string;
  firstName: string;
  phone: string | number;
  adress: string;
  number: number;
  entrance: string;
  apartment: string;
  callBack: string;
  addComment: string;
  addCommentKitchen: string;
  count: number,
  totalSum:number,
  status: string,
  productCountNumber:number,
  userUID:string


}

export interface IOrdersRequest {
  selectedValue: string;
  selectedHolders: string;
  selectedInterval: string;
  selectedPickup: string;
  date: string;
  cash: string;
  delivery: string;
  inAdvance: string;
  firstName: string;
  lastName:string,
  phone: string | number;
  productName: string;
  count: number;
  adress: string;
  number: number;
  entrance: string;
  apartment: string;
  callBack: string;
  addComment: string;
  addCommentKitchen: string,
  totalSum:number,
  status: string,
  productCountNumber:number,
userUID:string



}

export interface IOrdersResponse extends IOrdersRequest {
  id: number | string;
}
