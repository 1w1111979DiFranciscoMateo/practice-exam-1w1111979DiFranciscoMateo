import { Routes } from '@angular/router';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { ListOfOrdersComponent } from './components/list-of-orders/list-of-orders.component';
import { RolGuard } from './guards/guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
    { path: 'create-order', component: NewOrderComponent, canActivate: [RolGuard], data: {role:'admin'}}, //implementamos guards
    { path: 'orders', component: ListOfOrdersComponent, canActivate: [RolGuard], data: {role:'user'}},
    { path: '', redirectTo: 'login', pathMatch: 'full' }, //ruta por defecto redirectTo login
    { path: '**', component: ListOfOrdersComponent, canActivate:[RolGuard], data: {role:'user'}} //not found
];
