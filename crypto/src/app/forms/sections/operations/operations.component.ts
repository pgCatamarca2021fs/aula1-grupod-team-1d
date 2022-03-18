import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';
import { WalletService } from 'src/app/services/wallet.service';
import { MovementTypeService } from 'src/app/services/movement-type.service';
import { MoneyService } from 'src/app/services/money.service';

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
  @Input() refreshGrid : boolean = false;
  @Output () operationsResponse: EventEmitter<boolean> = new EventEmitter();
  @Input() operations:any; 
  idUsuario = Number(JSON.parse(localStorage.getItem('currentUser') as string).id);  
  operationsReadable: any;
  wallets: any;
  coins: any;

  constructor() {
  }

  ngOnInit(): void {
    //console.log("aaaa",this.operations)
  }
 
}
