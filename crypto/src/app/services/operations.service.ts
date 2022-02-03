import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private operations:{tipo:string, amount:number,date:string}[]

  get(){
    return this.operations
  }

  constructor() {
    this.operations=[{tipo:"Compra DogeCoin", amount:1500,date:"15/01/2022"}, {tipo:"Venta DogeCoin", amount:500,date:"15/01/2022"}, {tipo:"Compra EtherCoin", amount:1000,date:"18/01/2022"}, {tipo:"Compra DogeCoin", amount:1500,date:"20/01/2022"}, {tipo:"Compra Ethercoin", amount:500,date:"22/01/2022"}]
   }
}
