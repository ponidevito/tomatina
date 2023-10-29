export interface IOrders {
  id: number | string;
  // selectedValue: string;
  selectedHolders: string;
  // selectedInterval: string;
  // selectedPickup: string;
  date: string;
  productName: string;
  // cash: string;
  // delivery: string;
  // inAdvance: string;
  // firstName: string;
  // lastName:string,

  // phone: string | number;
  // adress: string;
  // number: number;
  // entrance: string;
  // apartment: string;
  // callBack: string;
  addComment: string;
  // addCommentKitchen: string;
  count: number;
  totalSum:number;
  freePackage:string;
  cash: string;
  withoutRest: string;
  remainingSum:number | null;
  noCall:string;
  // includeShopper:string;
  fullName: string;
  status: string,
  phone:number;

  // status: string,
  // productCountNumber:number,
  userUID:string


}

export interface IOrdersRequest {
  // selectedValue: string;
  selectedHolders: string;
//   selectedInterval: string;
//   selectedPickup: string;
  date: string;
//   cash: string;
//   delivery: string;
//   inAdvance: string;
  // firstName: string;
  // lastName:string,
//   phone: string | number;
  productName: string;
  freePackage:string;
  cash: string;
  withoutRestFrom: string;
  remainingSum:number | null;
  // includeShopper:string;
  count: number;
  noCall:string;
  fullName: string;
  status: string,
phone:number;
//   adress: string;
//   number: number;
//   entrance: string;
//   apartment: string;
//   callBack: string;
  addComment: string;
//   addCommentKitchen: string,
  totalSum:number,
//   status: string,
//   productCountNumber:number,
userUID:string



}

export interface IOrdersResponse extends IOrdersRequest {
  id: number | string;
}
