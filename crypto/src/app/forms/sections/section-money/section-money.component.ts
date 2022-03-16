import { Component, Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-section-money',
  templateUrl: './section-money.component.html',
  styleUrls: ['./section-money.component.css']
})
export class SectionMoneyComponent implements OnInit {
  
  @Input() money={cantidad:0,moneda:"",idBilletera:0,idMoneda:0}
  
  constructor() {
     
  }

  ngOnInit(): void {
  }

}
