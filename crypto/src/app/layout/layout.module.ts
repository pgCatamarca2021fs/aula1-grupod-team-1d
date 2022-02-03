import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { TeamComponent } from './team/team.component';
import { AppRoutingModule } from '../app-routing.module';
import { MemberComponent } from './member/member.component';


@NgModule({
  declarations: [
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    NavComponent,
    TeamComponent,
    MemberComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],  
  exports:[
    LayoutComponent,
    NavComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
