export interface IOrders {
  id: number | string;
  selectedHolders: string;
  date: string;
  productName: string;
  addComment: string;
  count: number;
  totalSum: number;
  freePackage: string;
  cash: string;
  withoutRest: string;
  remainingSum: number | null;
  noCall: string;
  fullName: string;
  status: string;
  phone: number;
  userUID: string;
  productCountNumber:number,
  selectedPickup:string

}

export interface IOrdersRequest {
  selectedHolders: string;
  date: string;
  productName: string;
  freePackage: string;
  cash: string;
  withoutRestFrom: string;
  remainingSum: number | null;
  count: number;
  noCall: string;
  fullName: string;
  status: string;
  phone: number;
  addComment: string;
  totalSum: number;
  userUID: string;
  productCountNumber:number,
  selectedPickup:string


}

export interface IOrdersResponse extends IOrdersRequest {
  id: number | string;
}
