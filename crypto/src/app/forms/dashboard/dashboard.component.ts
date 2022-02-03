import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  wallet:{name:string,price:number}[]  

  constructor(wallet:WalletService) {
    this.wallet=wallet.get()
   }

  ngOnInit(): void {
  }

}
