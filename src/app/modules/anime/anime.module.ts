import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';
import { CardComponent } from './card/card.component';
import { ListarComponent } from './pages/listar/listar.component';
import { AnimeService } from './service/anime.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GraficaAComponent } from './grafica-a/grafica-a.component';
import { GraficaBComponent } from './grafica-b/grafica-b.component';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartistModule } from 'ngx-chartist';
import { GraficaCComponent } from './grafica-c/grafica-c.component';


@NgModule({
  declarations: [
    CardComponent,
    ListarComponent,
    BuscarComponent,
    MostrarComponent,
    TablaComponent,
    GraficaAComponent,
    GraficaBComponent,
    GraficaCComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnimeRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    UIModule, // para las migas
    FormsModule, //para el modal
    NgxPaginationModule, //para hacer las paginaciones de las tablas
    Ng2SearchPipeModule, //para filtrado de la tabla
    NgApexchartsModule, //para grafica
    ChartsModule,//para graficar
    UIModule,
    ChartsModule,
    NgxChartistModule
  ],
  providers: [
    AnimeService
  ]
})
export class AnimeModule { }
