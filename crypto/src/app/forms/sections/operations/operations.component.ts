import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  idUsuario:number=2; //hacerlo dinamico
  operations:any; 

  constructor(private operationsServ:OperationsService) {this.operations=[];  }

  ngOnInit(): void {
    this.operationsServ.get(this.idUsuario).subscribe(data=>{ console.log(data); this.operations=data; });
    console.log(this.operations);    
  }

}
