import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MoneyService } from 'src/app/services/money.service';
import { MovementTypeService } from 'src/app/services/movement-type.service';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit {
  listMovementTypes:any;
  listMoney:any;
  
  form:any;
  classSelect:string="compra";

  constructor(private formBuilder:FormBuilder, private typeServ:MovementTypeService,private moneyServ:MoneyService) {
    this.form= this.formBuilder.group(
      {
        money:[0,[]],
        movementType:['',[]],
        quantity:[0,[]]
      }
   )}

  ngOnInit(): void {
    this.typeServ.list().subscribe(data=>{ this.listMovementTypes=data; });
    
    this.moneyServ.list().subscribe(data=>{ this.listMoney=data; });
  }

  onChangeColor() : void {
    let valor=this.form.get('movementType').value-1;
    this.form.styles="color:blue";
    if(valor<0) return;
    console.log(this.listMovementTypes[valor]["descripcion"].toLowerCase());
    this.classSelect=this.listMovementTypes[valor]["descripcion"].toLowerCase();
  }

}
