import { Component, OnInit } from '@angular/core';
import { UltimasCotizacionesService } from 'src/app/services/ultimas-cotizaciones.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
  wallet:any; 

  get resultados(){       
    return this.ultimasCotizacionesService.resultados; 
  }
  
  constructor(private walletServ:WalletService, private ultimasCotizacionesService:UltimasCotizacionesService) {  }

  ngOnInit (): void {
    this.wallet=this.walletServ.get();
    this.ultimasCotizacionesService.getCotizaciones();
    }
  }