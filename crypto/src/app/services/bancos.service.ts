import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancosService {
  private urlApi:string='https://localhost:44361/api/Banco/';

  constructor(private http:HttpClient) { }

  list():Observable<any> {
    return this.http.get(this.urlApi);
   }
}
