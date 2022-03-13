import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UltimasCotizacionesService } from 'src/app/services/ultimas-cotizaciones.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idUsuario:number=2; //hacerlo dinamico
  wallet:any;
  public resultados:any[] = [];
  listObservers$: Array<Subscription> = [];  
  
  constructor(private walletServ:WalletService, private ultimasCotizacionesService:UltimasCotizacionesService) {this.wallet=[];  }

  ngOnInit(): void {
    this.walletServ.get(this.idUsuario).subscribe(data=>{ console.log(data); this.wallet=data; });
    console.log("aaa",this.wallet);  
    this.ultimasCotizacionesService.getCotizaciones()
      .subscribe((respuesta:any) => {
        let resultado = respuesta;
        for(let i in resultado) {    
          let nombre = i;
          let cotizacion = resultado[i].USD;     
          let array = [];
          array.push(nombre, cotizacion);
          this.resultados.push(array);            
        }
        })
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log('🔴🔴🔴🔴🔴🔴🔴 Chau suscripción!');
  }

  walletAll(walletResponse:boolean) {
    console.log(walletResponse);
    this.walletServ.get(this.idUsuario).subscribe(data=>{ console.log("obtenido",data); this.wallet=data; });
   }
}
