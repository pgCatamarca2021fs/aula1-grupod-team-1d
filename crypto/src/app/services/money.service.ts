import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {
  private urlApi:string='https://localhost:44361/api/Moneda/';

  constructor(private http:HttpClient){ }

   list():Observable<any> {
    return this.http.get(this.urlApi);
   }
}
