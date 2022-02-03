import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private wallet:{name:string, price:number}[]
  
  get(){
    return this.wallet
  }

  constructor() { 
    this.wallet=[{name:"bitcoin", price:1500}, {name:"ethercoin", price:1520}, {name:"dogecoin", price:1000}, {name:"pesos", price:6000}]
  }
}
