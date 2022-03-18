import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigApp } from '../classs/ConfigApp';

@Injectable({
  providedIn: 'root'
})
export class MovementTypeService {
  private urlApi:string;

  constructor(private http:HttpClient){
    let config = new ConfigApp()
    this.urlApi=config.urlApi+'TipoMovimiento/';
   }

   list():Observable<any> {
    return this.http.get(this.urlApi);
   }
   /*
   getTipoOperacion(id:number):Observable<any> {
    return this.http.get(this.urlApi+"getTipoOperacion/"+id);
   }
   */
}
