import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArchivosRoutingModule } from "./archivos-routing.module";
import { SubirArchivosComponent } from "./subir-archivos/subir-archivos.component";
import { UIModule } from "../../shared/ui/ui.module";

@NgModule({
  declarations: [SubirArchivosComponent],
  imports: [
    CommonModule,
    ArchivosRoutingModule,
    UIModule,
    HttpClientModule,
    NgbModalModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    UIModule, //paea las migas
    NgbModule, //para las tablas
    Ng2SearchPipeModule,
  ],
})
export class ArchivosModule {}
