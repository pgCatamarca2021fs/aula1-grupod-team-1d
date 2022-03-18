import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './forms/dashboard/dashboard.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { ResetpasswordComponent } from './forms/resetpassword/resetpassword.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', component:LayoutComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent,
  children:[
    {path:'reset', component: ResetpasswordComponent}
  ],canActivate:[AuthGuard]   
},
  {path:'**', component:LayoutComponent}, //404
  {path:'', redirectTo: '', pathMatch: 'full'}, //x defecto*  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
