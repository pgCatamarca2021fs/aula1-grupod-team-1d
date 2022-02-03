import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  //team=[{name:"xxx xxx",position:"Desarrollador",image:"vacante.jpg",linkedin:"#",web:"#"},{name:"Velasco Guillermo",position:"Desarrollador",image:"guillermo.jpg",linkedin:"https://www.linkedin.com/in/guillermoavelasco/",web:"#"}]

  constructor() { }

  ngOnInit(): void {
  }

}
