import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-of-orders',
  standalone: true,
  imports: [RouterModule, DatePipe, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './list-of-orders.component.html',
  styleUrl: './list-of-orders.component.css'
})
export class ListOfOrdersComponent implements OnInit{
  ngOnInit(): void {
    //llamamos al metodo loadOrders() para que se ejecute ni bien se abra la pag
    this.loadOrders();
    //Para el filtrado, cuando los valores cambien del searchTerm
    //el ordersArray se actualiza
    this.searchTerm.valueChanges.subscribe(() => {
      this.ordersArray = this.filterOrder();
    })
  }
  //variable Subscription para manejar el tema de las subscripciones
  subsciption = new Subscription();
  //Injects
  private orderService = inject(OrderService);

  //FormControl para el filtro
  searchTerm = new FormControl('');
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

  //metodo par filtrar las ordenes por email y nombre
  //primero hace un if parar ver si esta vacio el input, si es asi carga
  //las ordenes de nuevo, sino hace un filtro por customerName o email
  filterOrder(){
    if(!this.searchTerm.value){
      this.loadOrders();
    }
    return this.ordersArray.filter(order => 
      order.customerName.toLowerCase().includes(this.searchTerm.value ?? '') ||
      order.email.toLowerCase().includes(this.searchTerm.value ?? '')
    );
  }


}
