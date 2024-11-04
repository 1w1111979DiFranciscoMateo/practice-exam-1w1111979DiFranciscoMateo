import { Product } from "./product"

export interface Order{
    id : string;
    customerName : string;
    email : string;
    products : {
        productId : string;
        quantity : number;
        stock : number;
        price : number;
    }[],
    total : number;
    orderCode : string;
    timestamp : Date;
}