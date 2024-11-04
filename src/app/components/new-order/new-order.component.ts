import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {
  //variable Subscription para manejar el tema de las subscripciones
  subscription = new Subscription();
  //Array de products para el select del FormGroup dentro del FormArray
  productsArray : Product[] = [
    {
      id: "1",
      name: "a ver",
      price: 10,
      stock: 10
    }
  ];
  //ReactiveForm
  form = new FormGroup({
    name: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required]),
    products: new UntypedFormArray([])
  })

  //FormArray
  //este get es para recibir todos los productos que hay en el formArray.
  get products(){
    return this.form.controls["products"] as UntypedFormArray;
  }
  //este metodo se llama cuando se agrega un nuevo producto, y crea un formulario para el product
  //y despues este formulario lo pasa al formArray.
  onNewProduct(){
    const formArray = this.form.controls["products"] as FormArray;
    const productForm = new FormGroup({
      product: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      stock: new FormControl("", [Validators.required])
    });
    formArray.push(productForm);
  }
  //este metodo se llama cuando se quiere eliminar un producto del formArray
  //recibe un index que es para eliminar el producto de ese index
  onDeleteProduct(index : number){
    this.products.removeAt(index);
  }

  //Save que se llama cuando se hace submit al form
  save(){

  }

}
