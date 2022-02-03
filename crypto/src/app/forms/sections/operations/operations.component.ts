import { Component, OnInit, Input } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations:{tipo:string, amount:number,date:string}[]

  constructor(operations:OperationsService) { 
    this.operations=operations.get();
  }

  ngOnInit(): void {
  }

}
