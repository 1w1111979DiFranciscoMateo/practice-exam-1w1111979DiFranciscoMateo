import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-of-orders',
  standalone: true,
  imports: [RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './list-of-orders.component.html',
  styleUrl: './list-of-orders.component.css'
})
export class ListOfOrdersComponent implements OnInit{
  ngOnInit(): void {
    //llamamos al metodo loadOrders() para que se ejecute ni bien se abra la pag
    this.loadOrders();
  }
  //variable Subscription para manejar el tema de las subscripciones
  subsciption = new Subscription();
  //Injects
  private orderService = inject(OrderService);

  //array de ordenes para guardar todas las ordenes que tenemos en la api, y la listamos
  ordersArray : Order[] = [];

  //metodo para cargar las ordenes de la api en el array ordersArray
  loadOrders(){
    this.orderService.getAllOrders().subscribe({
      next: (orders : Order[]) => {
        this.ordersArray = orders;
      }
    })
  }


}
