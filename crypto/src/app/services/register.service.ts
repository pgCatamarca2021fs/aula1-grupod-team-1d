import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Register{
  nombre:string,
    email:string,     
    password:string, 
    dni:number, 
    fk_provincia:number, 
    fk_banco:number, 
    cbu:number,
    fechaNacimiento:Date;
}

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  private urlApi:string='https://localhost:44361/api/Usuario/';
  private register: {
    nombre:string,
    email:string,     
    password:string, 
    dni:number, 
    fk_provincia:number, 
    fk_banco:number, 
    cbu:number,
    fechaNacimiento:Date;}[]

  constructor(private http:HttpClient) {
    this.register=[];
   }

   post(reg:Register):Observable<any>{
    return this.http.post(this.urlApi,reg)
  }

  list():Observable<any> {
    return this.http.get(this.urlApi);
   }
}
