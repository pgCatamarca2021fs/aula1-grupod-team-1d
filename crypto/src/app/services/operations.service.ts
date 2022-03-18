import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigApp } from '../classs/ConfigApp';

export interface Operation{
  id:number, fk_billeteraMoneda_Origen:number, fk_billeteraMoneda_Destino:number, cantidad_Origen:number, cantidad_Destino:number, fecha:string, fk_tipoMovimiento:number;
}

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private urlApi:string;

  private operation:{id:number, fk_billeteraMoneda_Origen:number, fk_billeteraMoneda_Destino:number, cantidad_Origen:number, cantidad_Destino:number, fecha:string, fk_tipoMovimiento:number;}[]
  
  constructor(private http:HttpClient) { 
    let configApp=new ConfigApp();
    this.urlApi=configApp.urlApi+"Movimiento/";
    this.operation=[];
  }

  public get(idUsuario:number): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.urlApi+"getMovimientoUsuario/"+idUsuario);
  } 

  post(opera:Operation):Observable<any>{
    return this.http.post(this.urlApi,opera)
  }
}
