import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ListarComponent } from '../../modules/anime/pages/listar/listar.component';

@Injectable({
  providedIn: 'root'
})
export class SalirAGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: ListarComponent):boolean {
    return component.canExit();
  }

}
