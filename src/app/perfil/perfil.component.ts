import { Component, OnInit } from '@angular/core';
import { Tienda } from '../_model/tienda';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TiendaService } from '../_service/tienda.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  bsModalRef: BsModalRef;
  tienda: Tienda = new Tienda;
  error: string;

  constructor(
    private tndSrv: TiendaService, private modalService: BsModalService, private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tndSrv.tienda.subscribe(data => {
      this.tienda = data;
    }, error => {
      console.log(error);
      this.error = error.statusText;
    });
    this.route.params.subscribe((params: Params) => {
      this.tndSrv.getOne(params['id']);
    });
  }

  btnEdt_click(event) {
    const initialState = {
      id: this.tienda._id,
      title: 'Editar perfil'
    };
    this.bsModalRef = this.modalService.show(PerfilEditarComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
  }

  btnCnl_click(event) {
    this.router.navigate(["/plato"]);
  }

}
