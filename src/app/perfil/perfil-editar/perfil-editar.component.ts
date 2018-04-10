import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Tienda } from '../../_model/tienda';
import {NgForm} from '@angular/forms';
import { TiendaService } from '../../_service/tienda.service';

@Component({
  selector: 'app-perfil-editar',
  templateUrl: './perfil-editar.component.html',
  styleUrls: ['./perfil-editar.component.css']
})
export class PerfilEditarComponent implements OnInit {

  id: string;
  title: string;
  closeBtnName: string;
  tienda:Tienda = new Tienda;

  constructor(public bsModalRef: BsModalRef, private tndSrv: TiendaService) { }

  ngOnInit() {
    this.tndSrv.get(this.id).subscribe(data => {
      this.tienda = data;
    }, error => {
      setTimeout(() => this.bsModalRef.hide(), 999);
    });
  }

  submit() {
    this.tndSrv.set(this.tienda);
    this.bsModalRef.hide();
  }

}
