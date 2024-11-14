import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class RolGuard implements CanActivate{
    constructor(){}

    //Injectamos el service auth y router
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        const requiredRol = route.data['role'];
        const userRole = this.authService.getUserRol();

        if(userRole === requiredRol || userRole === 'admin'){
            return true;
        } else {
            alert("No tenes permitido ingresar")
            this.router.navigate([userRole === 'admin' ? 'create-order' : 'orders']);
            return false;
        }
    }
}



