import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarComponent } from "./peges/consulta/listar/listar.component";
import { ListarPacienteComponent } from "./peges/pacientes/listar-paciente/listar-paciente.component";

const routes: Routes = [
  { path: "pdfs", component: ListarComponent },
  { path: "excel", component: ListarPacienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicaRoutingModule {}
