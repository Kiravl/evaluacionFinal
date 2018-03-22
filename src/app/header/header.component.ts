import { LoginService } from './../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
