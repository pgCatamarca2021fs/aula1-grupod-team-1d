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
  
  moneySel:string="";
  valueCalc:number=0;
  idUsuario = Number(localStorage.getItem('id'));
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
    this.valueCalc=0;
    this.form.get('quantity').setValue(0);
    if(valor<0) return;
    this.classSelect=this.listMovementTypes[valor]["descripcion"].toLowerCase();
    if(this.classSelect=="transferencia"){ this.listMoney=[this.listMoneyO[0]];  }
    else this.listMoney=this.listMoneyO.filter((x:any)=>x.nombre!=this.listMoneyO[0].nombre);
    
    if(this.classSelect!="" && (this.classSelect=="compra" || this.classSelect=="transferencia")){
      this.moneySel="Pesos";
    }
    else this.moneySel="Moneda Eletronica";
    
  }
  
  displayError(m:string):void{
    this.mjeError=true;
    this.mje=m;
    setTimeout(()=>{
      this.mjeError = false;
    },2000);  
  }

  findWallet(elem:string):any {
    return this.wallet.filter((x:any) => x.moneda.toLowerCase() == elem.toLowerCase())[0];
  };

  findMoneyExclude(elem:string):any { 
    return this.wallet.filter((x:any) => x.moneda.toLowerCase() != elem.toLowerCase());
  };

  findCurrentMoney(elem:string):any{
    return this.resultsDay.filter((x:any)=> x[0].toLowerCase()==elem.toLocaleLowerCase())[0];
  }

  findMovement(elem:string):any{
    return (this.listMovementTypes.filter((x:any)=>  x.descripcion.toLowerCase()==elem.toLowerCase())[0]);
  };

  transfer(moneySelected:any,elem:Operation){
    if(moneySelected!=undefined) {
      elem.cantidad=Number(moneySelected.cantidad)+Number(elem.cantidad);
    }    
  }

  compra(moneySelected:any,elem:Operation){
    if(moneySelected!=undefined) {
      elem.cantidad=Number(moneySelected.cantidad)+Number(elem.cantidad);
    }
  }

  venta(moneySelected:any,elem:Operation){
    if(moneySelected!=undefined) {
      elem.cantidad=Number(moneySelected.cantidad)-Number(elem.cantidad);
    }
  }

  async onOperation(event:Event,money:string, idMoney:number, movementType:number,quantity:number){
    let moneySelected=this.findWallet(money); 
    let moneyPesos=this.findWallet("pesos");
    let moneyValueCurrent=this.findCurrentMoney(money);
        
    if(this.classSelect=="venta" && this.wallet.length==0){ this.displayError("Operacion no Valida no posee fondos para Venta."); return;}
    else if(this.classSelect=="venta" && moneySelected==undefined){ this.displayError("Operacion no Valida no posee fondos para Venta."); return;}
    //console.log(this.wallet)
    if(this.classSelect=="compra" && this.wallet.length==0){ this.displayError("Operacion no Valida no posee fondos para Compra."); return;}
    

    let operaDestino:Operation=new Operation(this.idUsuario,idMoney,movementType,quantity,false);
    let operaOrigen:Operation=new Operation(this.idUsuario,0,0,0,false);
    
    if(this.classSelect=="transferencia"){
      this.transfer(moneySelected,operaDestino);
    }
    else if(this.classSelect=="compra" && moneyPesos.cantidad<(quantity)) {this.displayError("El Valor del Importe ingresado es superior"); return}
    else if(this.classSelect=="compra" && moneyPesos.cantidad>=(quantity)){ //*moneyValueCurrent[1]
      //console.log(moneyPesos.cantidad,(quantity/moneyValueCurrent[1]))
      operaDestino.cantidad= quantity/moneyValueCurrent[1];
      this.compra(moneySelected,operaDestino);
      operaOrigen.fkMoneda=moneyPesos.idMoneda;
      operaOrigen.tipoMovimiento=this.findMovement("venta").id;
      operaOrigen.cantidad= quantity;
      this.venta(moneyPesos,operaOrigen);
    }
  
   if(this.classSelect=="venta" && moneySelected.cantidad<quantity ) {this.displayError("El Valor del Importe ingresado es superior"); return}
    else if(this.classSelect=="venta" && moneySelected.cantidad>=quantity){
      
      operaDestino.cantidad= quantity;
      this.venta(moneySelected,operaDestino);
      operaOrigen.fkMoneda=moneyPesos.idMoneda;
      operaOrigen.tipoMovimiento=this.findMovement("compra").id;
      operaOrigen.cantidad= quantity*moneyValueCurrent[1];
      this.compra(moneyPesos,operaOrigen);
    }

    //guardar
    await this.walletServ.post(operaDestino).subscribe(async(data:any)=>{
      
      if(data==undefined) { this.displayError("Ocurrio un Error en Moneda Destino"); return;}
      if(data.Message!=undefined) { this.displayError("Moneda Destino:"+data.Message); return;}

      let idBilleteraDestino=data.id;
      
      var movimiento = {
        "id":0,
        "fk_billeteraMoneda_Origen": 0,
        "fk_billeteraMoneda_Destino": data.id,
        "cantidad_Origen": 0,
        "cantidad_Destino": data.cantidad,
        "fecha":"01/01/0001",
        "fk_tipoMovimiento":movementType
      };

      if(this.classSelect!="transferencia"){
        await this.walletServ.post(operaOrigen).subscribe(async(data:any)=>{
          
          if(data==undefined) { this.displayError("Ocurrio un Error en Moneda Origen"); return;}
          if(data.Message!=undefined) { this.displayError("Moneda Origen:"+data.Message); return;}

          if(this.classSelect=="compra"){
      
            movimiento = {
              "id":0,
              "fk_billeteraMoneda_Origen": moneyPesos.idBilletera,
              "fk_billeteraMoneda_Destino": idBilleteraDestino,
              "cantidad_Origen": quantity,
              "cantidad_Destino": quantity/moneyValueCurrent[1],
              "fecha":"01/01/0001",
              "fk_tipoMovimiento":movementType
            };
          }
          else 
          if(this.classSelect=="venta"){
            movimiento = {
              "id":0,
              "fk_billeteraMoneda_Origen": data.id,
              "fk_billeteraMoneda_Destino": moneyPesos.idBilletera,
              "cantidad_Origen": quantity,
              "cantidad_Destino": quantity*moneyValueCurrent[1],
              "fecha":"",
              "fk_tipoMovimiento":movementType
            };
          }
          await this.operationsServ.post(movimiento).subscribe(async(data:any)=>{
            if(data==undefined) { this.displayError("Ocurrio un Error en Movimiento"); return;}
            if(data.Message!=undefined) { this.displayError("Movimiento:"+data.Message); return;}

            this.walletResponse.emit(true);
          });
          
        });
      }
      else {
          await this.operationsServ.post(movimiento).subscribe(async(data:any)=>{
            if(data==undefined) { this.displayError("Ocurrio un Error en Movimiento"); return;}
            if(data.Message!=undefined) { this.displayError("Movimiento:"+data.Message); return;}

            this.walletResponse.emit(true);
          });
  
      }       
     
    });
    
    this.form.get('quantity').setValue(0);
    this.valueCalc=0;
  }
  
  onSubmitForm(event:Event):void{
    event.preventDefault();
    const idMoney:number = this.form.get('money')?.value;
    const movementType:number = this.form.get('movementType')?.value | 0;
    const quantity:number = this.form.get('quantity')?.value;
    
    if(movementType==0) {this.displayError("Seleccione Tipo de Movimiento");return;}
    if(idMoney==0) {this.displayError("Seleccione Moneda");return;}
    if(quantity<=0){ this.displayError("Ingrese Cantidad");return;}
    
    let moneyIndex=this.listMoney.findIndex((x:any)=> Number(x.id)==Number(idMoney));
    const money= this.listMoney[moneyIndex]["nombre"]; 
    this.onOperation(event,money,idMoney,movementType,quantity);
  }

  onCalc(event:Event):void{
    const idMoney:number = this.form.get('money')?.value;
    let moneyIndex=this.listMoney.findIndex((x:any)=> Number(x.id)==Number(idMoney));
    const money= this.listMoney[moneyIndex]["nombre"];
    let moneyValueCurrent=this.findCurrentMoney(money);
    const quantity:number = this.form.get('quantity')?.value;
    console.log(moneyValueCurrent)
    if(this.classSelect=="compra"){
      this.valueCalc=Number((Number(quantity)/Number(moneyValueCurrent[1])).toFixed(6));
    }
    else 
    if(this.classSelect=="venta"){
      this.valueCalc=Number((Number(quantity)*Number(moneyValueCurrent[1])).toFixed(6));
    }
    else {
      this.valueCalc=quantity;
    }
  }
}
