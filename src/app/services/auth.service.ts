import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticated = false;
  private userRole : string = "";

  //metodo de login, si coincide con los datos mockeados entra, si no, devuelve false
  login(username : string, password : string) : boolean{
    if(username === "mateo" && password === "123"){
      this.isAuthenticated = true;
      this.userRole = "admin";
      return true;
    } else if (username === "lucio" && password === "123") {
      this.isAuthenticated = true;
      this.userRole = "user";
      return true;
    }
    return false;
  }

  logout(){
    this.isAuthenticated = false;
    this.userRole = "";
  }

  isLoggedIn() : boolean{
    return this.isAuthenticated;
  }

  getUserRol() : string{
    return this.userRole;
  }
}
