import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {

  Form:FormGroup;
 constructor(private FormBuilder: FormBuilder){
   this.Form= this.FormBuilder.group(
     {
       password:['',[Validators.required, Validators.minLength(8)]],
       mail:['',[Validators.required, Validators.email]]
     }
   )
   
  }
  get password()
 {
   return this.Form.get("password");
 }
get mail(){
  return this.Form.get("mail");
}
get PasswordValid(){
  return this.password?.touched&& !this.password?.valid;
}
get MailValid(){
  return this.mail?.touched &&  !this.mail?.valid;
}

ngOnInit(): void {}
}
