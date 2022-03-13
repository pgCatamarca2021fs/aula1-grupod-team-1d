import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UltimasCotizacionesService {
  public resultados:any[] = [];

  constructor(private http: HttpClient) {  }

  getCotizaciones() {        
    this.http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DOGE,BNB,USDT,LTC&tsyms=USD")
      .subscribe((respuesta:any) => {
        let resultado = respuesta;
        for(let i in resultado) {    
          let nombre = i;
          let cotizacion = resultado[i].USD;     
          let array = [];
          array.push(nombre, cotizacion);
          this.resultados.push(array);            
        }
        return this.resultados;
      })
  }
}
