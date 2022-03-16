import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigApp } from '../classs/ConfigApp';

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
  private urlApi:string;
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
    let conf:ConfigApp=new ConfigApp();
    this.urlApi=conf.urlApi+'Usuario/';
    this.register=[];
   }

  post(reg:Register):Observable<any>{
    const respuesta = this.http.post(this.urlApi,reg)
    return respuesta;
  }

  list():Observable<any> {
    const respuesta = this.http.get(this.urlApi);
    return respuesta;
   }
}
