import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {

  formRegistro:FormGroup = new FormGroup({});
 constructor(private formBuilder: FormBuilder){
   this.formRegistro= this.formBuilder.group(
     {
       name:['',[Validators.required, Validators.minLength(3)]],
       lastname:['',[Validators.required, Validators.minLength(3)]],
       dni:['',[Validators.required]],
       password:['',[Validators.required, Validators.minLength(8)]],
       repeat:['',[Validators.required, Validators.minLength(8)]],
       mail:['',[Validators.required, Validators.email]],
       mailrepeat:['',[Validators.required, Validators.email]]
     }
   )
   

  {
    
  }

  }

  get name(){
    return this.formRegistro.get("name");
  }
  
  get lastname(){
    return this.formRegistro.get("name");
  }
  
  get dni(){
    return this.formRegistro.get("name");
  }

  get password(){
   return this.formRegistro.get("password");
 }

get repeatpassword(){
 return this.formRegistro.get("repeatpassword");
 }
get mail(){
  return this.formRegistro.get("mail");
}
get mailrepeat(){
  return this.formRegistro.get("mail");
}
get PasswordValid(){
  return this.password?.touched&& !this.password?.valid;
}
get MailValid(){
  return this.mail?.touched &&  !this.mail?.valid;
}
get RepeatPasswordValid(){
  return this.password?.touched&& !this.password?.valid;
}
get MailRepeatValid(){
  return this.mail?.touched &&  !this.mail?.valid;
}
get nameValid(){
  return this.name?.touched&& !this.name?.valid;
}
get lastnameValid(){
  return this.lastname?.touched &&  !this.lastname?.valid;
}
get dniValid(){
  return this.dni?.touched&& !this.dni?.valid;
  }

ngOnInit(): void {}
}
