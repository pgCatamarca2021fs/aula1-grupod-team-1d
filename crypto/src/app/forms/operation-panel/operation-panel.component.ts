import { IfStmt, JitEvaluator } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { Operation } from 'src/app/classs/Operation';
import { MoneyService } from 'src/app/services/money.service';
import { MovementTypeService } from 'src/app/services/movement-type.service';
import { WalletService } from 'src/app/services/wallet.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit {
  @Input() wallet:any;
  @Input() resultsDay:any
  @Output () walletResponse: EventEmitter<boolean> = new EventEmitter();

  idUsuario = Number(localStorage.getItem('id'));
  //idUsuario:number=2;//usuario dinamico
  opera:Operation=new Operation();
  operaDestino:Operation= new Operation();

  listMovementTypes:any;
  listMoney:any;
  listMoneyO:any;
  
  mjeError:boolean=false;
  mje:string='';
  form:any;
  classSelect:string="compra";

  constructor(private formBuilder:FormBuilder, private typeServ:MovementTypeService,private moneyServ:MoneyService,private walletServ:WalletService, private operationsServ:OperationsService) {
    this.form= this.formBuilder.group(
      {
        money:[0,[]],
        movementType:['',[]],
        quantity:[0,[Validators.required]]
      }
     )
  }

  ngOnInit(): void {
    this.typeServ.list().subscribe(data=>{ this.listMovementTypes=data; });    
    this.moneyServ.list().subscribe(data=>{ this.listMoney=data; this.listMoneyO=data; });
  }

  onChangeColor() : void {
    let valor=this.form.get('movementType').value-1;
    this.form.styles="color:blue";
    if(valor<0) return;
    this.classSelect=this.listMovementTypes[valor]["descripcion"].toLowerCase();
    if(this.classSelect=="transferencia"){ this.listMoney=[this.listMoneyO[0]];  }
    else this.listMoney=this.listMoneyO.filter((x:any)=>x.nombre!=this.listMoneyO[0].nombre);
  }
  
  displayError(m:string):void{
    this.mjeError=true;
    this.mje=m;
    setTimeout(()=>{
      this.mjeError = false;
    },2000);  
  }

  findMoney(elem:string):any {
    return this.wallet.filter((x:any) => x.moneda.toLowerCase() == elem.toLowerCase())[0];
  };

  findMoneyExclude(elem:string):any { 
    return this.wallet.filter((x:any) => x.moneda.toLowerCase() != elem.toLowerCase());
  };

  findResults(elem:string):any{
    return this.resultsDay.filter((x:any)=> x[0].toLowerCase()==elem.toLocaleLowerCase())[0];
  }

  onOperation(event:Event,money:string, idMoney:number, movementType:number,quantity:number){
    let moneySelected=this.findMoney(money); 
    //console.log(moneySelected)
    
    let moneyPesos=this.findMoney("pesos");
    //console.log(moneyPesos);
    this.opera=new Operation();
    this.operaDestino=new Operation();

    let resultMoney=this.findResults(money);

    this.opera.destino=true;
    if(this.classSelect=="venta" && this.wallet.length==1){ this.displayError("Operacion no Valida no posee fondos para Venta."); return;}

    if(this.classSelect=="transferencia" && moneySelected!=undefined ) {
      moneySelected.precio=Number(moneySelected.precio+Number(quantity));
      this.opera.cantidad=moneySelected.precio;
      this.operaDestino.tipoMovimiento=0;
    }
    else if(this.classSelect=="transferencia" && moneySelected==undefined){
      this.wallet.push({moneda:money,precio:quantity,idBilletera:0,idMoneda:0});
      this.opera.cantidad=quantity;
      this.operaDestino.tipoMovimiento=0;
    }
    
    if(this.classSelect=="compra" && moneySelected!=undefined && moneyPesos.precio>=(quantity)) { 
      moneySelected.precio=Number(moneySelected.precio+Number(quantity/resultMoney[1]));//cotizacion
      moneyPesos.precio=Number(moneyPesos.precio)-Number(quantity);
      this.opera.cantidad= moneySelected.precio;
    }
    else if(this.classSelect=="compra" && moneySelected==undefined  && moneyPesos.precio>=(quantity)){  
      moneyPesos.precio=Number(moneyPesos.precio)-Number(quantity); //cotizacio
      this.opera.cantidad=Number(quantity/resultMoney[1]);
    }
    else if(this.classSelect=="compra" && moneySelected!=undefined ) {this.displayError("El Valor del Importe ingresado es superior"); return}
    
    if(this.classSelect=="venta" && moneySelected!=undefined && moneySelected.precio>=Number(quantity)) { //cotizacion
      //console.log("entre",moneySelected,quantity)
      moneySelected.precio=Number(moneySelected.precio-Number(quantity));//cotizacion
      moneyPesos.precio=Number(moneyPesos.precio+Number(quantity*resultMoney[1]));
      this.opera.cantidad=moneySelected.precio;
    }
    else if(this.classSelect=="venta" && moneySelected!=undefined ) {this.displayError("El Valor del Importe ingresado es superior"); return;}
    
    this.opera.fkUsuario=this.idUsuario;
    this.opera.fkMoneda=idMoney;
    this.opera.tipoMovimiento=movementType;
    
    this.walletServ.post(this.opera).subscribe((data:any)=>{ 

        if(moneySelected!=undefined) {this.wallet=this.findMoneyExclude(moneySelected.moneda); }
        else {moneySelected=data; 
          console.log('select',moneySelected)}
        this.wallet.push({moneda:money,precio:data.cantidad,idBilletera:data.id,idMoneda:data.fk_moneda});

        if(this.classSelect=="compra"){
          this.operaDestino.fkUsuario=this.idUsuario;
          this.operaDestino.tipoMovimiento=(this.listMovementTypes.filter((x:any)=> x.descripcion=="Venta"))[0].id;
          this.operaDestino.cantidad=moneyPesos.precio;
          //moneyPesos.precio=this.operaDestino.cantidad;
          this.operaDestino.fkMoneda=moneyPesos.idMoneda; 
          //this.wallet=this.findMoneyExclude("pesos");
          //this.wallet.push(moneyPesos);
          console.log('destino',this.operaDestino);  
        }
    
        if(this.classSelect=="venta"){
          this.operaDestino.fkUsuario=this.idUsuario;
          this.operaDestino.tipoMovimiento=(this.listMovementTypes.filter((x:any)=> x.descripcion=="Compra"))[0].id;
          this.operaDestino.cantidad=moneyPesos.precio;
          //moneyPesos.precio=this.operaDestino.cantidad; 
          //console.log("monedadest",moneyPesos.idMoneda)
          //this.operaDestino.fkMoneda=moneyPesos.idMoneda;
          //this.wallet=this.findMoneyExclude("pesos");  
          this.wallet.push(moneyPesos); 
        }
        
        this.walletServ.get(this.idUsuario).subscribe((data:any)=>{
          this.wallet=data; 
          //console.log(data);
        });
        //console.log("wallet",this.wallet);

        if(Number(this.operaDestino.tipoMovimiento)>0){
          //console.log("destino",this.operaDestino);
          this.walletServ.post(this.operaDestino).subscribe((data:any)=>{
            // alert("ok");
            moneySelected=data;
          });
        }
        
        //console.log("idbilletera")
        /* Movimiento de prueba */
        let movimiento = {
          "id":0,
          "fk_billeteraMoneda_Origen": 0,
          "fk_billeteraMoneda_Destino": moneyPesos.idBilletera,
          "cantidad_Origen": 0,
          "cantidad_Destino": moneyPesos.precio,
          "fecha":"",
          "fk_tipoMovimiento":movementType
        };

        if(this.classSelect=="compra"){
          movimiento = {
            "id":0,
            "fk_billeteraMoneda_Origen": moneyPesos.idBilletera,
            "fk_billeteraMoneda_Destino": moneySelected.idBilletera,
            "cantidad_Origen": quantity,
            "cantidad_Destino": quantity/resultMoney[1],
            "fecha":"",
            "fk_tipoMovimiento":movementType
          };
        }
        else 
        if(this.classSelect=="venta"){
          movimiento = {
            "id":0,
            "fk_billeteraMoneda_Origen": moneySelected.idBilletera,
            "fk_billeteraMoneda_Destino": moneyPesos.idBilletera,
            "cantidad_Origen": quantity,
            "cantidad_Destino": quantity*resultMoney[1],
            "fecha":"",
            "fk_tipoMovimiento":movementType
          };
        }

        this.operationsServ.post(movimiento).subscribe((data:any)=>{
          // alert("ok");
          // this.operationsServ.initializeData();
        });

            this.walletResponse.emit(true);
        });       
  }
  
  onSubmitForm(event:Event):void{
    event.preventDefault();
    const idMoney:number = this.form.get('money')?.value;
    const movementType:number = this.form.get('movementType')?.value | 0;
    const quantity:number = this.form.get('quantity')?.value | 0;
    
    if(movementType==0) {this.displayError("Error en Tipo de Movimiento");return;}
    if(idMoney==0) {this.displayError("Error en Moneda");return;}
    //if(quantity<=0.00001){ this.displayError("Error en Cantidad");return;}
        
    let moneyIndex=this.listMoney.findIndex((x:any)=> Number(x.id)==Number(idMoney));
    const money= this.listMoney[moneyIndex]["nombre"]; 
    this.onOperation(event,money,idMoney,movementType,quantity);

    
    /* Movimiento de prueba */
    /*
    let movimiento = {
      "id": 1,
      "fk_billeteraMoneda_Origen": 4,
      "fk_billeteraMoneda_Destino": 2,
      "cantidad_Origen": 222.0,
      "cantidad_Destino": 777.0,
      "fecha": "2022-03-12T12:03:06.0166459-03:00",
      "fk_tipoMovimiento": 3
    };

    this.operationsServ.post(movimiento).subscribe((data:any)=>{
      // alert("ok");
      // this.operationsServ.initializeData();
    });
    */
  }
}
