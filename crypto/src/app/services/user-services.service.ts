import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigApp } from '../classs/ConfigApp';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  private urlApi:string;

  private user:any
  
  constructor(private http:HttpClient) { 
    let config=new ConfigApp();
    this.urlApi= config.urlApi+'Usuario/';
    this.user=[];
  }

  public get(id:number): Observable<any> {
    return this.http.get<any>(this.urlApi+id);
  } 
}
