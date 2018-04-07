import { LoginService } from './../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tiendaId: string = "5abae2bc30885bbd1eff733c";

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
