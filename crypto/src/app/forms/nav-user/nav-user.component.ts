import { Component, OnInit, Output } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})

export class NavUserComponent implements OnInit {
  idUsuario = Number(localStorage.getItem('id'));
  @Output() usuario="";
  user:any;
  constructor(private userServ:UserServicesService) { }

  ngOnInit(): void {
    this.userServ.get(this.idUsuario).subscribe((data:any)=>{ this.user=data; });
  }

}
