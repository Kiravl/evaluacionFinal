import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tienda } from '../_model/tienda';
import { Subject } from 'rxjs';

@Injectable()
export class TiendaService {

  url: string = "http://localhost:3000/tienda";
  tienda: Subject<Tienda> = new Subject();

  constructor(private http: HttpClient) { }

  get(id) {
    let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
    return this.http.get<Tienda>(`${this.url}/leer/${id}`, {
        headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  getOne(id) {
    let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
    this.http.get<Tienda>(`${this.url}/leer/${id}`, {
        headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }).subscribe(data => {
      this.tienda.next(data);
    }, error => {
      this.tienda.error(error);
    });
  }

  set(args) {
    let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
    this.http.put(`${this.url}/actualizar`, args, {
        headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }).subscribe(data => {
      this.getOne(args._id);
    }, error => {
      this.tienda.error(error);
    });
  }

}
