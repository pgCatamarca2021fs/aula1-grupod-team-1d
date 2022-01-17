import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { ValoresComponent } from './inicio/valores/valores.component';



@NgModule({
  declarations: [
    InicioComponent,
    ValoresComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
