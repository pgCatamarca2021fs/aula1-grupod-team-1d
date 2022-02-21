import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
contactForm: FormGroup;

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
  }
}
