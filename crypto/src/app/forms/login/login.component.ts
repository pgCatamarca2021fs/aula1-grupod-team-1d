import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorSession: boolean = false;
  spinner:boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private loginService:LoginService, private cookie: CookieService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.spinner = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loginService.login(email, password)
      .subscribe({
        next: (responseOK) => {         
          console.log(responseOK);
          if(responseOK.email != ""){    
            const currentUser = {
              id: responseOK.lista[0].id,
              email: responseOK.email,
              token: responseOK.token,
              nombre: responseOK.lista[0].nombre
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));          
            
            this.spinner = false;
            this.router.navigate(['/dashboard']);
            console.log('Sesion iniciada correcta');
          } else {
            this.spinner = false;
            console.log('Ocurrio error con tu email o password');  
            this.errorSession = true;       
            setTimeout(()=>{
              this.errorSession = false;
            },3000);                  

          }
          
       },
       error: (responseFail) => {         
          console.log('Ocurrio error con tu email o password');  
          this.spinner = false;
          this.errorSession = true;       
          setTimeout(()=>{
            this.errorSession = false;
          },3000);          
       }      
     });
  }  
}