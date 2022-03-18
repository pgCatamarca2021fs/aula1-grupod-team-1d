import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigApp } from '../classs/ConfigApp';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApiRest:string;// 'https://localhost:44361/api/Login';  


  constructor(private http:HttpClient) { 
    let config=new ConfigApp();
    this.urlApiRest=config.urlApi+'Login/'
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
        
    return this.http.post(this.urlApiRest, body);
  }
}
