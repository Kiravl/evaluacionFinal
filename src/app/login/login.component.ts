import { LoginService } from './../_service/login.service';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje: string; 
  
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  iniciarSesion(form: NgForm) {
    let nombre_usuario = form.value.usuario;
    let contrasena = form.value.clave;

    this.loginService.login(nombre_usuario, contrasena).subscribe(data => {
      let token = JSON.stringify(data);
      sessionStorage.setItem("access_token", token);

      if (data) {
        this.router.navigate(['plato']);
      }
    }, err => {
      this.mensaje = "Credenciales incorrectas";
    });    
  }


}
