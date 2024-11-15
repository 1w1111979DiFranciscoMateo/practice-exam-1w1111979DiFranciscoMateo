import { Product } from "./product";

export interface Order{
    id : string;
    customerName : string;
    email : string;
    products : Product[];
    total : number;
    orderCode : string;
    timestamp : Date;
}

//En products : Products[] podemos hacerlo asi, si es que al model de product
//le agregamos los atributos extra que necesita Order, si no podemos agregarle
//los atributos extra por cualquier motivo, podemos hacer lo siguiente:
/*
products : {
    productId : string;
    quantity : number;
    stock : number;
    price : number
}[]
*/ 
//Con esto creamos un array de objetos excsactos como necesitamos en el model Order