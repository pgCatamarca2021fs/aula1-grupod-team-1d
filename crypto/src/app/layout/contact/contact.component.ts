import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
contactForm: FormGroup;
spinner:boolean = false;
mensajeEnviado:boolean = false;

  constructor(private fb: FormBuilder) {
  	this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void { }
   
  contact() {
    const nombre = this.contactForm.get('nombre')?.value;
    const email = this.contactForm.get('email')?.value;
    const mensaje = this.contactForm.get('mensaje')?.value;
    const datosAEnviar = { nombre, email, mensaje };

    console.log(datosAEnviar);

    this.spinner = true;

    setTimeout(()=>{
      this.contactForm.reset();
      this.spinner = false;
      this.mensajeEnviado = true;

      setTimeout(()=>{
        this.mensajeEnviado = false;
      },4000);
    },1500);
  }
}