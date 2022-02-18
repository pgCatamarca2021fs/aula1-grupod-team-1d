import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repitePassword: ['', [Validators.required]]      
    });
  }

  ngOnInit(): void {
  }

  register() {
    const nombre = this.registerForm.get('nombre')?.value;
    const apellido = this.registerForm.get('apellido')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const repitePassword = this.registerForm.get('repitePassword')?.value;

    if(this.verificarPassword(password, repitePassword)) {
      console.log('Pasó la validación');
      console.log('nombre: ', nombre);
      console.log('apellido: ', apellido);
      console.log('email: ', email);
      console.log('password: ', password);
      console.log('repite-password: ', repitePassword);   
    }
  }

  verificarPassword(password: string, repitePassword: string): boolean {
    if(password === repitePassword) {
      return true;
    }
    this.errorPassword = true;
    return false;
  }

}