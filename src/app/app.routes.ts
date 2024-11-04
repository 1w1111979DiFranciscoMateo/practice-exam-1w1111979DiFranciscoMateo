import { Routes } from '@angular/router';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { ListOfOrdersComponent } from './components/list-of-orders/list-of-orders.component';

export const routes: Routes = [
    { path: 'create-order', component: NewOrderComponent},
    { path: 'orders', component: ListOfOrdersComponent },
    { path:'', redirectTo: 'create-order', pathMatch: 'full' }, //ruta por defecto redirectTo create-order
    { path: '**', component: NewOrderComponent} //not found
];
