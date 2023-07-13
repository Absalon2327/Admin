import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicaRoutingModule } from './clinica-routing.module';
import { ListarComponent } from './peges/consulta/listar/listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ListarPacienteComponent } from './peges/pacientes/listar-paciente/listar-paciente.component';
import { PdfViewerComponent } from './peges/consulta/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ListarReportesComponent } from './reportes/listar-reportes/listar-reportes.component';


@NgModule({
  declarations: [
    ListarComponent,
    ListarPacienteComponent,
    PdfViewerComponent,
    ListarReportesComponent
  ],
  imports: [
    CommonModule,
    ClinicaRoutingModule,
    HttpClientModule,
    NgbModalModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    UIModule,//paea las migas
    NgbModule,//para las tablas
    Ng2SearchPipeModule,
    PdfViewerModule
  ]
})
export class ClinicaModule { }
