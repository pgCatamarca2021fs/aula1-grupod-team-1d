import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  private urlApi:string='https://localhost:44361/api/Usuario/';

  private user:any
  
  constructor(private http:HttpClient) { 
    this.user=[];
  }

  public get(id:number): Observable<any> {
    return this.http.get<any>(this.urlApi+id);
  } 
}
