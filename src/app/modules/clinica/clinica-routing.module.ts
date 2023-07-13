import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarComponent } from "./peges/consulta/listar/listar.component";
import { ListarPacienteComponent } from "./peges/pacientes/listar-paciente/listar-paciente.component";
import { PdfViewerComponent } from './peges/consulta/pdf-viewer/pdf-viewer.component';
import { ListarReportesComponent } from './reportes/listar-reportes/listar-reportes.component';

const routes: Routes = [
  { path: "pdfs", component: ListarComponent },
  { path: "excel", component: ListarPacienteComponent },
  {path: "pdfViewer", component: PdfViewerComponent},
  {path: "varios", component: ListarReportesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicaRoutingModule {}
