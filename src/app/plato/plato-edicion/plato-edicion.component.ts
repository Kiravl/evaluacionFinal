import { Plato } from './../../_model/plato';
import { PlatoService } from './../../_service/plato.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-plato-edicion',
  templateUrl: './plato-edicion.component.html',
  styleUrls: ['./plato-edicion.component.css']
})
export class PlatoEdicionComponent implements OnInit {

  id: string;
  edicion: boolean = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private platoService: PlatoService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'urlImagen': new FormControl(''),
      'precio': new FormControl(0)
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  operar() {
    let nuevoPlato = new Plato(this.form.value['id'], this.form.value['nombre'], this.form.value['urlImagen'], this.form.value['precio']);

    if(this.edicion){
      this.platoService.actualizarPlato(nuevoPlato);
    }else{      
      this.platoService.agregarPlato(nuevoPlato);
    }
  }

  initForm() {
    if (this.edicion) {
      this.platoService.getPlato(this.id).subscribe(data => {

        let id = 0;
        let nombre = '';
        let urlImagen = '';
        let precio = 0;

        id = data._id;
        nombre = data.nombre;
        urlImagen = data.urlImagen;
        precio = data.precio;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'urlImagen': new FormControl(urlImagen),
          'precio': new FormControl(precio)
        });
      });
    }


  }

}
