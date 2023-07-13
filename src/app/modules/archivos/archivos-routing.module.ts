import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubirArchivosComponent } from "./subir-archivos/subir-archivos.component";

const routes: Routes = [{ path: "subir", component: SubirArchivosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchivosRoutingModule {}
