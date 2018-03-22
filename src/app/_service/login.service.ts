import { HOST } from './var.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
    logeado : boolean = false;

    url: string = HOST;
    
    constructor(private http: HttpClient, private router: Router) {
    }

    login(nombre_usuario: string, contrasena: string){
        //this.logeado = true;
        //return this.logeado;
        let body = `{"nombre_usuario":"${nombre_usuario}","contrasena":"${contrasena}"}`;
        let sbody = JSON.parse(body);
        return this.http.post(`${this.url}/login`, sbody);
    }

    estaLogeado() {
        //return this.logeado;
        let token = sessionStorage.getItem("access_token");
        return token != null ? 1 : 0;
    }

    cerrarSesion(){
        //this.logeado = false;   
        sessionStorage.clear();
        this.router.navigate(['login']);     
    }

}