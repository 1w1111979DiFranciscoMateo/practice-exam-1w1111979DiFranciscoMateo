import { Component, Inject, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { min, retry, Subscription, timestamp } from 'rxjs';
import { Product } from '../../models/product';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { minLengthArray, maxLengthArray } from '../../validations/custom-validations';


@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit{
  
  ngOnInit(): void {
      //llamamos al metodo para cargar el select de productos
      this.loadProducts();
  }
  //variable Subscription para manejar el tema de las subscripciones
  subscription = new Subscription();
  //Injects
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  //variable para tener la fecha actual
  today = new Date();
  //Array de products para el select del FormGroup dentro del FormArray
  productsArray : Product[] = [];
  //ReactiveForm
  form = new UntypedFormGroup({
    customerName: new UntypedFormControl("",[Validators.required, Validators.minLength(3)]),
    email: new UntypedFormControl("",[Validators.required, Validators.email]),
    products: new UntypedFormArray([], [minLengthArray(1), maxLengthArray(10), this.uniqueProductValidator]),
    total: new UntypedFormControl(0),
    orderCode: new UntypedFormControl(""), //lo cargo cuando se confirme el formulario
    timestamp: new UntypedFormControl(this.today) 
  })

  //FormArray
  //Getter para acceder a los productos en el FormArray
  get products(){
    return this.form.controls["products"] as UntypedFormArray;
  }
  //este metodo se llama cuando se agrega un nuevo producto, y crea un formulario para el product
  //y despues este formulario lo pasa al formArray.
  onNewProduct(){
    const formArray = this.form.controls["products"] as UntypedFormArray;
    const productForm = new UntypedFormGroup({
      product: new UntypedFormControl("", [Validators.required]),
      quantity: new UntypedFormControl(1, [Validators.required, Validators.min(1)]),
      price: new UntypedFormControl(0, [Validators.required]), 
      stock: new UntypedFormControl(0, [Validators.required])
    });

    //escuchar cambios en el select de products y buscamos en productsArray
    productForm.controls['product'].valueChanges.subscribe((productId) =>{
      const selectedProduct = this.productsArray.find((p) => p.id === productId);
      if(selectedProduct){
        //Si el producto se encuentra en el array, actualizar price y stock
        productForm.controls['price'].setValue(selectedProduct.price);
        productForm.controls['stock'].setValue(selectedProduct.stock);

        //Actualizamos la validacion max para quantity para que sea menos que el stock 
        //dependiendo del producto selecionado
        const quantityControl = productForm.controls['quantity'];
        quantityControl.setValidators([Validators.required, Validators.min(1), Validators.max(selectedProduct.stock)]);
        quantityControl.updateValueAndValidity();
      }
    })

    //escuchamos posibles cambios a quantity y price para recalcular el total
    productForm.controls['quantity'].valueChanges.subscribe(() => {
      this.orderTotal();
    });
    productForm.controls['price'].valueChanges.subscribe(() => {
      this.orderTotal();
    });
    formArray.push(productForm);
  }
  //este metodo se llama cuando se quiere eliminar un producto del formArray
  //recibe un index que es para eliminar el producto de ese index
  onDeleteProduct(index : number){
    this.products.removeAt(index);
    this.orderTotal();
  }

  //metodo para cargar la lista productsArray con datos de la api
  loadProducts(){
    this.orderService.getAllProducts().subscribe({
      next: (products : Product[]) => {
        this.productsArray = products;
      },
      error: (err) => {
        alert("Error al cargar lista de productos");
      }
    });
  }

  //metodo para generar el valor total de la orden
  orderTotal(){
    let total = 0;
    this.products.controls.forEach(productForm => {
      const price = productForm.get('price')?.value || 0;
      const quantity = productForm.get('quantity')?.value || 0;
      total += price * quantity;
    });
    this.form.patchValue({
      total : total
    });
  }

  //metodo para generar el codigo de la orden
  generateOrderCode(){
    const customerName = this.form.get('customerName')?.value || "";
    const email = this.form.get('email')?.value || "";
    const timestamp = Date.now().toString();

    const firstLetter = customerName.charAt(0).toUpperCase();
    const lastFourEmail = email.slice(-4);

    const orderCode = `${firstLetter}${lastFourEmail}${timestamp}`;
    this.form.controls['orderCode'].setValue(orderCode);
  }

  //metodo para encontrar el nombre de un producto por el id de ese producto
  getProductName(productId : string) : string{
    //variable product que como valor tiene un true o false si en el productsArray encuentra
    //un id === al id recibido como parametro
    const product = this.productsArray.find(p => p.id === productId);
    //se devuelve el nombre del producto si se encuentra o 'Producto desconocido' si no se encuentra
    return product ? product.name : 'Producto desconocido';
  }

  //Validator de que no se pueda selecciona un mismo producto en una orden
  //es una validacion sincronica (porque no hace una llamada a la api)
  uniqueProductValidator(control: AbstractControl): ValidationErrors | null {
    if (!(control instanceof FormArray)) {
      return null;
    }
    const selectedProductIds = control.controls.map((control) => control.get('product')?.value as number);
    const hasDuplicates = selectedProductIds.some((id, index) => selectedProductIds.indexOf(id) !== index);
    return hasDuplicates ? { duplicateProducts: true } : null;
  }

  //la validacion async iria aca, en el proyecto del profe se llama emailOrdderLimitValidator()

  //Save que se llama cuando se hace submit al form
  save(){
    if(this.form.invalid){
      alert("Formulario Invalido");
      console.log(this.form.value)
      return;
    }
    this.generateOrderCode();
    const orden : Order = this.form.value;
    const addSubscription = this.orderService.addOrder(orden).subscribe({
      next: () => {
        this.router.navigate(['orders']);
      },
      error: (err) => {
        alert("Error al comunicarse con la API")
      }
    });
    this.subscription.add(addSubscription);
    this.form.reset();
  }

}
