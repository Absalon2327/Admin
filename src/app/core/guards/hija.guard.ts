import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from '../../account/services/usuario.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class HijaGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.usuarioService.validarToken().pipe(tap((isAuth: boolean) =>{
      if(!isAuth){
        this.router.navigateByUrl('/account/login');
      }
    }));
  }
}
