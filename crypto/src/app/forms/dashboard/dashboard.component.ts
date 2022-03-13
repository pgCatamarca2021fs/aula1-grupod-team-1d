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
  
  constructor(private walletServ:WalletService) {this.wallet=[];  }

  ngOnInit(): void {
    this.walletServ.get(this.idUsuario).subscribe(data=>{ console.log(data); this.wallet=data; });
    console.log("aaa",this.wallet);    
  }

  walletAll(walletResponse:boolean) {
    console.log(walletResponse);
    this.walletServ.get(this.idUsuario).subscribe(data=>{ console.log("obtenido",data); this.wallet=data; });
   }

}
