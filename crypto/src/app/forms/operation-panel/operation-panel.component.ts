import { IfStmt, JitEvaluator } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { Operation } from 'src/app/classs/Operation';
import { MoneyService } from 'src/app/services/money.service';
import { MovementTypeService } from 'src/app/services/movement-type.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit {
  @Input() wallet:any;
  idUsuario:number=2;//usuario dinamico
  opera:Operation=new Operation();
  operaDestino:Operation= new Operation();

  listMovementTypes:any;
  listMoney:any;
  listMoneyO:any;
  
  mjeError:boolean=false;
  mje:string='';
  form:any;
  classSelect:string="compra";

  constructor(private formBuilder:FormBuilder, private typeServ:MovementTypeService,private moneyServ:MoneyService,private walletServ:WalletService) {
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

  onOperation(event:Event,money:string, idMoney:number, movementType:number,quantity:number){
    let moneySelected=this.findMoney(money); 
    let moneyPesos=this.findMoney("pesos");
    //console.log(moneyPesos);
    this.opera=new Operation();
    this.operaDestino=new Operation();
    
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
      moneySelected.precio=Number(moneySelected.precio+Number(quantity/1));//cotizacion
      moneyPesos.precio=Number(moneyPesos.precio-Number(quantity));
      this.opera.cantidad= moneySelected.precio;
    }
    else if(this.classSelect=="compra" && moneySelected==undefined  && moneyPesos.precio>=quantity){  
      //this.wallet.push({moneda:money,precio:quantity,idBilletera:0,idMoneda:0});
      moneyPesos.precio=Number(moneyPesos.precio-Number(quantity/1)); //cotizacio
      this.opera.cantidad=quantity;
    }
    else if(this.classSelect=="compra" && moneySelected!=undefined ) {this.displayError("El Valor del Importe ingresado es superior"); return}
    
    if(this.classSelect=="venta" && moneySelected!=undefined && moneySelected.precio>=quantity*1) { //cotizacion
      //console.log("entre",moneySelected,quantity)
      moneySelected.precio=Number(moneySelected.precio-Number(quantity));//cotizacion
      moneyPesos.precio=Number(moneyPesos.precio+Number(quantity*1));
      this.opera.cantidad=moneySelected.precio;
    }
    else if(this.classSelect=="venta" && moneySelected!=undefined ) {this.displayError("El Valor del Importe ingresado es superior"); return;}
    
    this.opera.fkUsuario=this.idUsuario;
    this.opera.fkMoneda=idMoney;
    this.opera.tipoMovimiento=movementType;
    
    this.walletServ.post(this.opera).subscribe((data:any)=>{ 

        if(moneySelected!=undefined) {this.wallet=this.findMoneyExclude(moneySelected.moneda); }
        //console.log("data",data)
        this.wallet.push({moneda:money,precio:data.cantidad,idBilletera:data.id,idMoneda:data.fk_moneda});
        //console.log('moneySelected',moneySelected);        
        //console.log("moneyPesos:",moneyPesos)
        if(this.classSelect=="compra"){
          this.operaDestino.fkUsuario=this.idUsuario;
          this.operaDestino.tipoMovimiento=(this.listMovementTypes.filter((x:any)=> x.descripcion=="Venta"))[0].id;
          this.operaDestino.cantidad=moneyPesos.precio;
          //moneyPesos.precio=this.operaDestino.cantidad;
          this.operaDestino.fkMoneda=moneyPesos.idMoneda; 
          this.wallet=this.findMoneyExclude("pesos");
          this.wallet.push(moneyPesos);    
        }
    
        if(this.classSelect=="venta"){
          this.operaDestino.fkUsuario=this.idUsuario;
          this.operaDestino.tipoMovimiento=(this.listMovementTypes.filter((x:any)=> x.descripcion=="Compra"))[0].id;
          this.operaDestino.cantidad=moneyPesos.precio;
          //moneyPesos.precio=this.operaDestino.cantidad; 
          //console.log("monedadest",moneyPesos.idMoneda)
          this.operaDestino.fkMoneda=moneyPesos.idMoneda;
          this.wallet=this.findMoneyExclude("pesos");  
          this.wallet.push(moneyPesos); 
        }

        this.wallet=this.walletServ.get(this.idUsuario); 
        //console.log("wallet",this.wallet);

        if(Number(this.operaDestino.tipoMovimiento)>0){
          this.walletServ.post(this.operaDestino).subscribe((data:any)=>{
            // alert("ok");
          });
        }
      
    });   
    
  }
  
  onSubmitForm(event:Event):void{
    event.preventDefault();
    const idMoney:number = this.form.get('money')?.value;
    const movementType:number = this.form.get('movementType')?.value | 0;
    const quantity:number = this.form.get('quantity')?.value | 0;
    
    if(movementType==0) {this.displayError("Error en Tipo de Movimiento");return;}
    if(idMoney==0) {this.displayError("Error en Moneda");return;}
    if(quantity<=0){ this.displayError("Error en Cantidad");return;}
        
    let moneyIndex=this.listMoney.findIndex((x:any)=> Number(x.id)==Number(idMoney));
    const money= this.listMoney[moneyIndex]["nombre"]; 
    this.onOperation(event,money,idMoney,movementType,quantity);
  }
}
