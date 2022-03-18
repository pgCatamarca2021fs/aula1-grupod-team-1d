import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../classs/Operation';
import { ConfigApp } from '../classs/ConfigApp';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private urlApi:string;
  
  private wallet:{cantidad:number,moneda:string, idBilletera:number, idMoneda:number}[]
  
  constructor(private http:HttpClient) { 
    let conf:ConfigApp=new ConfigApp();
    this.urlApi=conf.urlApi+'BilleteraMonedas/';
    this.wallet=[];
  }

  getBilleteraUsuario(idUsuario:number){
    return this.http.get(this.urlApi+'getBilleteraUsuario/'+idUsuario);
  }
  
  post(opera:Operation):Observable<any>{
    return this.http.post(this.urlApi,opera)
  }
  
}
