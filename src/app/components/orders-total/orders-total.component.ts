import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Order } from '../../models/order';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-orders-total',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders-total.component.html',
  styleUrl: './orders-total.component.css'
})
export class OrdersTotalComponent implements OnChanges{
  ngOnChanges(): void {
    this.calculateTotal();
    this.eventEmit();
  }
  //Input para recibir el array de ordenes del componente list-of-orders
  @Input() allOrders : Order[] = [];
  //variable para guardar el total de todas las ordenes
  totalSum : number = 0;
  //Output para enviarle a list-of-orders (padre) un booleano si totalSumGoal es > $3000
  @Output() totalSumGoal = new EventEmitter<boolean>();

  //metodo para caluclar el valor total de todas las ordenes listadas
  private calculateTotal() : void {
    //reiniciamos el valor de totalSum a 0
    this.totalSum = 0;
    //hacemos un for que recorre todas las ordenes del ordersArray
    for(const order of this.allOrders){
      //le sumamos el valor del total de la orden a totalSum 
      //el ?? es para que si ese valor es null o undefined se cambie a 0
      this.totalSum += order.total ?? 0;
    }
  }

  //metodo para emitir el evento al padre si es que se cumple la condicion 
  eventEmit(){
    if(this.totalSum >= 7000){
      this.totalSumGoal.emit(true);
    }
  }
}
