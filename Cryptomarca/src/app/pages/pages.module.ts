import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { ValoresComponent } from './inicio/valores/valores.component';
import { HeroComponent } from './inicio/hero/hero.component';
import { QuePodesHacerComponent } from './inicio/que-podes-hacer/que-podes-hacer.component';
import { AccesoComponent } from './inicio/acceso/acceso.component';



@NgModule({
  declarations: [
    InicioComponent,
    ValoresComponent,
    HeroComponent,
    QuePodesHacerComponent,
    AccesoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
