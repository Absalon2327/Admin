import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PerfilRoutingModule } from "./perfil-routing.module";
import { CardInfoComponent } from "./card-info/card-info.component";
import { PerfilComponent } from "./perfil.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { UIModule } from "src/app/shared/ui/ui.module";

@NgModule({
  declarations: [CardInfoComponent, PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    UIModule, // para las migas
    FormsModule, //para el modalcar
    UIModule,
  ],
})
export class PerfilModule {}
