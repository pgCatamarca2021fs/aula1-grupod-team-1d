import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { BancosService } from 'src/app/services/bancos.service';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorPassword: boolean = false;
  listProvincias:any;
  listProvinciasO:any;
  listBancos:any;
  listBancosO:any;
  spinner:boolean = false;
  errorSession: boolean = false;
  provinciaSeleccionada: any;
  bancoSeleccionado: any;
  fechaNacimientoSeleccionada: Date = new Date();
  mensajeError:any;

  constructor(private fb: FormBuilder, private router: Router, private provinciasServ: ProvinciasService, private bancosServ: BancosService, private registerServ:RegisterService) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repitePassword: ['', [Validators.required]],
      cbu: ['', [Validators.required, Validators.minLength(20)]],
      banco: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.provinciasServ.list().subscribe(data=>{ this.listProvincias=data; this.listProvinciasO=data; });
    this.bancosServ.list().subscribe(data=>{ this.listBancos=data; this.listBancosO=data; });
  }

  register() {
    this.spinner = true;
    const nombre = this.registerForm.get('nombre')?.value;
    const email = this.registerForm.get('email')?.value;
    const dni = this.registerForm.get('dni')?.value;    
    const password = this.registerForm.get('password')?.value;
    const repitePassword = this.registerForm.get('repitePassword')?.value;
    const cbu = this.registerForm.get('cbu')?.value;
    const fechaNacimiento = this.registerForm.get('fechaNacimiento')?.value;

    if(this.verificarPassword(password, repitePassword)) {
      let datos = {
        "nombre": nombre,
        "email": email,
        "dni": dni,
        "password": password,
        "cbu": cbu,
        "fk_provincia": this.provinciaSeleccionada.id | 0,
        "fk_banco": this.bancoSeleccionado.id | 0,
        "fechaNacimiento": fechaNacimiento    
      };

      this.registerServ.post(datos).subscribe((data:any)=>{
        console.log(data);
        
        if(data.status === 1){
          this.spinner = false;
          this.router.navigate(['/login']);
          console.log('Registro correcto');          
          
        } else {
          this.errorSession = true;       
          this.spinner = false;
          this.mensajeError = data.message;

          setTimeout(()=>{
            this.mensajeError = '';
            this.errorSession = false;
          },3000);
        }
      });     
      this.spinner = false;

    } else {
      this.errorSession = true;       
      this.mensajeError = 'Ocurrio un error con el registro';
      this.spinner = false;

      setTimeout(()=>{
        this.mensajeError = '';
        this.errorSession = false;
      },3000);
    }
  }

  verificarPassword(password: string, repitePassword: string): boolean {
    if(password === repitePassword) {
      return true;
    }
    this.errorPassword = true;
    return false;
  }

  selecionarProvincia(event: any) {
    const id = event.target.value;

    if(id != "null"){
      this.provinciaSeleccionada = this.listProvincias.find((x: { id: any; }) => x.id == id);      
    }
  }

  selecionarBanco(event: any) {
    const id = event.target.value;

    if(id != "null"){
      this.bancoSeleccionado = this.listBancos.find((x: { id: any; }) => x.id == id);      
    }
  }
}