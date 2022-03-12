import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';
import { WalletService } from 'src/app/services/wallet.service';
import { MovementTypeService } from 'src/app/services/movement-type.service';
import { MoneyService } from 'src/app/services/money.service';

import { map } from 'rxjs/operators';

interface Operation {
  id:number;
  fk_billeteraMoneda_Origen:number;
  fk_billeteraMoneda_Destino:number;
  cantidad_Origen:number;
  cantidad_Destino:number;
  fecha:string;
  fk_tipoMovimiento:number;
}

interface Wallet
{
  precio:number,
  moneda:string, 
  idBilletera:number, 
  idMoneda:number
}

interface Money
{
  id:number;
  nombre:string;
  cotizacion:number;
  fecha_cotizacion:string;
  direccion_contrato:string;
}

interface MovementType
{
  id:number;
  descripcion:string;
}

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  idUsuario:number=2; //hacerlo dinamico
  operations:any; 
  operationsReadable: any;
  wallets: any;
  movementTypes: any;
  coins: any;

  constructor(private operationsServ:OperationsService, private walletServ:WalletService,  private typeServ:MovementTypeService, private moneyServ:MoneyService) {
    this.operations=[]; 
    this.operationsReadable=[]; 
    this.wallets=[];
    this.movementTypes=[];
    this.coins=[];
  }

  initializeData() {
    this.typeServ.list().subscribe(data=>{ 
      // console.log("movementTypes",data); 
      this.movementTypes=data; 
    });  

    this.walletServ.get(this.idUsuario).subscribe(data=>{ 
      // console.log("wallets",data); 
      this.wallets=data; 
    });

    this.moneyServ.list().subscribe(data=>{ 
      // console.log("coins",data); 
      this.coins=data; 
    });

    this.operationsServ.get(this.idUsuario).subscribe(data=>{ 
      //console.log("operations",data); 
      
      this.operations=data; 

      this.operationsReadable=this.operations.map((operation: Operation) => {
        let billetera_Origen = this.wallets.find((wallet: Wallet) => wallet.idBilletera == operation.fk_billeteraMoneda_Origen);
        let billetera_Destino = this.wallets.find((wallet: Wallet) => wallet.idBilletera == operation.fk_billeteraMoneda_Destino);

        let date = new Date(operation.fecha);
        let ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(date);
        let mo = new Intl.DateTimeFormat('es', { month: 'numeric' }).format(date);
        let da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(date);
        let fecha = `${da}/${mo}/${ye}`;

        let movimiento = {
          id: operation.id, 
          fk_billeteraMoneda_Origen: operation.fk_billeteraMoneda_Origen,
          billetera_Origen: billetera_Origen?.idBilletera, 
          fk_billeteraMoneda_Destino: operation.fk_billeteraMoneda_Destino, 
          billetera_Destino: billetera_Destino.idBilletera, 
          cantidad_Origen: operation.cantidad_Origen,
          moneda_Origen: this.coins.find((coin: Money) => coin.id == billetera_Origen?.idMoneda), 
          cantidad_Destino: operation.cantidad_Destino,
          moneda_Destino: this.coins.find((coin: Money) => coin.id == billetera_Destino.idMoneda), 
          fecha: fecha, 
          tipoMovimiento: this.movementTypes.find((movementType: MovementType) => movementType.id == operation.fk_tipoMovimiento).descripcion, 
        }

        return movimiento;
      });

      console.log("operationsReadable",this.operationsReadable); 
    }); 
  }

  ngOnInit(): void {
    this.initializeData();
  }

}
