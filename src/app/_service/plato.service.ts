import { Plato } from './../_model/plato';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlatoService {

    platosCambio = new Subject<Plato[]>();
    url: string = "http://localhost:3000/plato";

    /*platos: Plato[] = [
        new Plato(1, 'Hamburguesa', 'https://cdn3.cnet.com/img/zti-8maGznHRwm0Q6af0m7InwzM=/fit-in/970x0/2017/03/22/1c848061-a343-460a-a044-b07cb94e7927/if-burger.jpg', 10),
        new Plato(2, 'Jugo de Naranja', 'http://cfxtras.com/wp-content/uploads/2016/04/el-jugo-de-naranja-ayuda-para-la-acidez.jpg', 5)
    ];*/

    constructor(private http: HttpClient) { }

    getPlatos() {
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
        return this.http.get<Plato[]>(`${this.url}/listar`, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        });
        //return this.platos;
    }

    getPlato(id: string) {
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
        return this.http.get<Plato>(`${this.url}/leer/${id}`, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        });
        //return this.platos;
    }

    agregarPlato(plato: Plato) {
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
        return this.http.post(`${this.url}/registrar`, plato, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        }).subscribe(data => {
            if (data === 1) {
                this.getPlatos().subscribe(platos => {
                    this.platosCambio.next(platos);
                });
            }
        });
    }

    actualizarPlato(plato: Plato) {
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
        return this.http.put(`${this.url}/actualizar`, plato, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        }).subscribe(data => {
            if (data === 1) {
                this.getPlatos().subscribe(platos => {
                    this.platosCambio.next(platos);
                });
            }
        });
    }

    eliminarPlato(plato: Plato) {
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
        return this.http.delete(`${this.url}/eliminar/${plato._id}`, {
            headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
        }).subscribe(data => {
            if (data === 1) {
                this.getPlatos().subscribe(platos => {
                    this.platosCambio.next(platos);
                });
            }
        });
    }
}