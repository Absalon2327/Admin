import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibliotecasRoutingModule } from './bibliotecas-routing.module';
import { ListarbibliotecasComponent } from './pages/listarbibliotecas/listarbibliotecas.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../../shared/ui/ui.module';

@NgModule({
  declarations: [
    ListarbibliotecasComponent
  ],
  imports: [
    CommonModule,
    BibliotecasRoutingModule,
    HttpClientModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbModule
  ]
})
export class BibliotecasModule { }
