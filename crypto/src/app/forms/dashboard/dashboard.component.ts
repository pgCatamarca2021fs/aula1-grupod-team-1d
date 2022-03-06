import { Component, OnInit } from '@angular/core';
import { MovementTypeService } from 'src/app/services/movement-type.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  wallet:any; 
 movementTypes:any;

  constructor(private walletServ:WalletService,private typeServ:MovementTypeService) {  }

  ngOnInit(): void {
    this.wallet=this.walletServ.get();
    this.typeServ.list().subscribe(data=>{
      this.movementTypes=data;
    });
  }

}
