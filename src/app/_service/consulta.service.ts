import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from "../_model/pedido";

@Injectable()
export class ConsultaService{

    private url: string = 'http://localhost:3000/consumo';

    pedidos: Pedido[] = [];

    constructor(private http: HttpClient){        
    }

    getPedidos(tipoRango: string, fecha1: string, fecha2: string){  
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;      
        return this.http.get<Pedido[]>(`${this.url}/listar/${tipoRango}/${fecha1}/${fecha2}`, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        });
    }

}