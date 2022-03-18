import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UltimasCotizacionesService } from 'src/app/services/ultimas-cotizaciones.service';
import { WalletService } from 'src/app/services/wallet.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idUsuario = Number(JSON.parse(localStorage.getItem('currentUser') as string).id);  
  
  wallet:any; 
  refreshGrid : boolean = false;
  public resultados:any[] = [];
  listObservers$: Array<Subscription> = [];  
  operations:any;
  
  constructor(private walletServ:WalletService, private ultimasCotizacionesService:UltimasCotizacionesService,private operationsServ:OperationsService) {this.wallet=[];  }

  ngOnInit(): void {
    this.walletServ.getBilleteraUsuario(this.idUsuario).subscribe(data=>{ this.wallet=data; });
    this.operationsServ.get(this.idUsuario).subscribe(data=>{  this.operations=data; });
    
    this.ultimasCotizacionesService.getCotizaciones()
      .subscribe((respuesta:any) => {
        let resultado = respuesta;
        for(let i in resultado) {    
          let nombre = i;
          let cotizacion = resultado[i].ARS;     
          let array = [];
          array.push(nombre, cotizacion);
          this.resultados.push(array);            
        }
        }) 
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())    
  }

  walletAll(walletResponse:boolean) {
    //console.log(walletResponse);
    this.walletServ.getBilleteraUsuario(this.idUsuario).subscribe(data=>{ 
    this.wallet=data;
    
    this.operationsServ.get(this.idUsuario).subscribe(data=>this.operations=data);    
    });
    this.refreshGrid = true;
  }

  responseOperations(operationsResponse:boolean) {        
    operationsResponse = true;
  }

}
