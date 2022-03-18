import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.estaAutenticado();
  }

  estaAutenticado(): boolean {
    try {
      JSON.parse(localStorage.getItem('currentUser') as string).token;  
      return true;
            
    } catch (error) {
      console.log('No has iniciado sesión...', error);      
      this.router.navigate(['/', 'login']);
      return false;
    }
  }    
}
