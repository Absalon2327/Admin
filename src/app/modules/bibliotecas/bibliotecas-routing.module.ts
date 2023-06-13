import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarbibliotecasComponent } from './pages/listarbibliotecas/listarbibliotecas.component';

const routes: Routes = [{path:'listar',component:ListarbibliotecasComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecasRoutingModule { }
