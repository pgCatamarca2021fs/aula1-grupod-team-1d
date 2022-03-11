import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../classs/Operation';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private urlApi:string='https://localhost:44361/api/BilleteraMonedas/';

  private wallet:{precio:number,moneda:string, idBilletera:number, idMoneda:number}[]
  
  constructor(private http:HttpClient) { 
    this.wallet=[{moneda:"pesos",precio:1501, idBilletera:56, idMoneda:1}]
  }

  get(idUsuario:number){
    return this.wallet;
  }

  /*get(idUsuario:number):Observable<any> {
    //return this.http.get(this.urlApi); //+"/"+idUsuario
  }*/

  

  post(opera:Operation):Observable<any>{
    return this.http.post(this.urlApi,opera)
  }
  
}
