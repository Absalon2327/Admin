import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/listar/listar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { AdminGuard } from '../../core/guards/admin.guard';
import { SalirAGuard } from '../../core/guards/salir-a.guard';

const routes: Routes = [{path:'listar', canActivate:[AdminGuard], component: ListarComponent, canDeactivate:[SalirAGuard]},
{path:'mostrar', component: MostrarComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimeRoutingModule { }
