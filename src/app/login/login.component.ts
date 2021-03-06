import { LoginService } from './../_service/login.service';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tienda } from '../_model/tienda';
import { TiendaService } from '../_service/tienda.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje: string; 
  busy: boolean;
  
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  iniciarSesion(form: NgForm) {
    this.busy = true;
    let nombre_usuario = form.value.usuario;
    let contrasena = form.value.clave;

    this.loginService.login(nombre_usuario, contrasena).subscribe(data => {
      let token = JSON.stringify(data);
      sessionStorage.setItem("access_token", token);
      sessionStorage.setItem("tienda", "5abae2bc30885bbd1eff733c");
      if (data) {
        this.router.navigate(['plato']);
      }
    }, err => {
      console.log(err);
      this.busy = false;
      this.mensaje = "Credenciales incorrectas";
    });    
  }


}
