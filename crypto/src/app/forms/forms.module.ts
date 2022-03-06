import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NavUserComponent } from './nav-user/nav-user.component';
import { SectionMoneyComponent } from './sections/section-money/section-money.component';
import { OperationsComponent } from './sections/operations/operations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule as FormsModuleAngular } from '@angular/forms';
import { OperationPanelComponent } from './operation-panel/operation-panel.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ResetpasswordComponent,
    NavUserComponent,
    SectionMoneyComponent,
    OperationsComponent,
    OperationPanelComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModuleAngular
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SectionMoneyComponent,
    OperationsComponent,
    ReactiveFormsModule,
    FormsModuleAngular,
    OperationPanelComponent
  ]
})
export class FormsModule { }
