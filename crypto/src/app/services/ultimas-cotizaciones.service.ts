import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UltimasCotizacionesService {
  public resultados:any[] = [];

  constructor(private http: HttpClient) {  }

  getCotizaciones() {        
    return this.http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DOGE,BNB,USDT,LTC&tsyms=EUR")
  }
}
