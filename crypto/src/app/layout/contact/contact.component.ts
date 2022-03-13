import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { format } from 'path';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
contactForm: FormGroup;
spinner:boolean = false;
mensaje:boolean = false;

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

    console.log('Pasó la validación');
    console.log('nombre: ', nombre);
    console.log('email: ', email);
    console.log('mensaje: ', mensaje);
    this.spinner = true;

    setTimeout(()=>{
      this.spinner = false;
      this.mensaje = true;
      
      
      

    },3000)

    

    setTimeout(()=>{
      this.mensaje = false;
      
      

    },3000);

    


    

    
    
  }

  

  /* mostrarSpinner() {
    

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `        
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>        
    `;
    resultado.appendChild(spinner);
} */
}
