import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionMoneyComponent } from './section-money/section-money.component';
//import { OperationsComponent } from './operations/operations.component';

@NgModule({
  declarations: [
    SectionMoneyComponent,
    //OperationsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SectionsModule { }
