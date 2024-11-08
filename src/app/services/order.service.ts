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
  //url
  private readonly url = 'https://672a987e976a834dd023dde7.mockapi.io';

  //metodo Agregar una orden
  add(orden : Order) : Observable<Order>{
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
}
