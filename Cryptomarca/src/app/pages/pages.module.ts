import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { ValoresComponent } from './inicio/valores/valores.component';
import { HeroComponent } from './inicio/hero/hero.component';
import { QuePodesHacerComponent } from './inicio/que-podes-hacer/que-podes-hacer.component';
import { AccesoComponent } from './inicio/acceso/acceso.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    InicioComponent,
    ValoresComponent,
    HeroComponent,
    QuePodesHacerComponent,
    AccesoComponent,
    RegistroComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
