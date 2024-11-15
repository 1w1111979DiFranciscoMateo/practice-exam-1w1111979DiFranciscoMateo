export interface Product{
    id : string;
    name : string;
    quantity : number;
    price : number;
    stock : number;
}

//SI este modelo nunca se va a usar para cargar un product a la api, le podemos
//agregar los atributos que orders necesita (quantity en este caso)
//Hacemos esto para poder usar el model Product en el modelo de order.

//Si usamos este modelo para cargar un producto, hay que ver si coinciden los atributos