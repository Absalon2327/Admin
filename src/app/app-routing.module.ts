import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { BibliotecasModule } from './modules/bibliotecas/bibliotecas.module';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: 'crypto-ico-landing', component: CyptolandingComponent, canActivate: [AuthGuard], canLoad:[AuthGuard] },
  { path: 'anime', component: LayoutComponent, loadChildren: () => import('./modules/anime/anime.module').then(m => m.AnimeModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'bibliotecas', component: LayoutComponent, loadChildren: () => import('./modules/bibliotecas/bibliotecas.module').then(m => m.BibliotecasModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'perfil', component: LayoutComponent, loadChildren: () => import('./modules/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'consulta', component: LayoutComponent, loadChildren: () => import('./modules/clinica/clinica.module').then(m => m.ClinicaModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'reportes', component: LayoutComponent, loadChildren: () => import('./modules/clinica/clinica.module').then(m => m.ClinicaModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'archivos', component: LayoutComponent, loadChildren: () => import('./modules/archivos/archivos.module').then(m => m.ArchivosModule), canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
