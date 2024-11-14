import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //Injectamos el service auth y router
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  //formulario reavctivo para el login
  loginForm = new UntypedFormGroup({
    username : new UntypedFormControl("",[Validators.required, Validators.minLength(3)]),
    password : new UntypedFormControl("", [Validators.required, Validators.minLength(3)])
  })

  login(){
    if (this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)){
      if(this.authService.getUserRol() === 'admin'){
        this.router.navigate(['create-order']);
      } else {
        this.router.navigate(['orders']);
      }
    } else {
      alert("Datos Incorrectos");
    }
  }
}
