import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApiRest:string = 'https://localhost:44361/api/Login';  


  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
        
    return this.http.post(this.urlApiRest, body);
  }
}
