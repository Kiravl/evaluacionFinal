import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ConsumoService{        
    private url: string = 'http://localhost:3000/consumo/registrar';

    constructor(private http: HttpClient){        
    }    
    
    registrar(pedido: any){
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
        return this.http.post(this.url, pedido, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        });
    }
    
}