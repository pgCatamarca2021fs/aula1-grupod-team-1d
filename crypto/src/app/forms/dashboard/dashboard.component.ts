import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idUsuario:number=2; //hacerlo dinamico
  wallet:any; 
  
  constructor(private walletServ:WalletService) {  }

  ngOnInit(): void {
    this.wallet=this.walletServ.get(this.idUsuario);
    console.log(this.wallet);
  }

}
