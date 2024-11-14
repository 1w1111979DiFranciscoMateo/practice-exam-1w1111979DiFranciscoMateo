import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() { }
  //Para que funcionen las llamadas http, en app.config.ts 
  //dentro de Providers[] hay que agregar provideHttpClient() 
  //inject
  private readonly http : HttpClient = inject(HttpClient);
  //url si uso mockapi.io 
  //private readonly url = 'https://672a987e976a834dd023dde7.mockapi.io';
  private readonly url = 'http://localhost:3000'
  //comando para levantar el JSON Server = json-server --watch db.json

  //metodo Agregar una orden
  addOrder(orden : Order) : Observable<Order>{
    return this.http.post<Order>(this.url + "/orders", orden);
  }

  //metodo para recibir todos los productos como array
  getAllProducts() : Observable <Product[]> {
    return this.http.get<Product[]>(this.url + "/products");
  }

  //metodo para recibir todas las ordenes como array
  getAllOrders() : Observable <Order[]> {
    return this.http.get<Order[]>(this.url + "/orders");
  }

  //metodo para recibir una array de orders dependiendo de un email 
  //que le pasamos como parametro
  getOrderByEmail(email : string) : Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/orders?email=${email}`);
  }
}
