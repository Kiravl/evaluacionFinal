import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../_model/cliente';

@Injectable()
export class ClienteService {

  private url: string = 'http://localhost:3000/cliente';

  constructor(private http: HttpClient) { }

  getClientes(){
    let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
    return this.http.get<Cliente[]>(`${this.url}/listar`,{
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(nombreCliente: string){
    let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
    let cliente: Cliente = new Cliente();
    cliente.nombreCompleto = nombreCliente;
    cliente.dni = '00000000';
    return this.http.post<Cliente>(`${this.url}/registrar`, cliente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}