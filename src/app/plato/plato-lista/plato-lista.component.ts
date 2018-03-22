import { PlatoService } from './../../_service/plato.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Plato } from '../../_model/plato';

@Component({
  selector: 'app-plato-lista',
  templateUrl: './plato-lista.component.html',
  styleUrls: ['./plato-lista.component.css']
})
export class PlatoListaComponent implements OnInit {

  platos: Plato[];
  filterQuery = "";

  constructor(private platoService: PlatoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.platoService.platosCambio.subscribe(data => {
      this.platos = data;
    });

    this.platoService.getPlatos().subscribe(data => {
      console.log(data);
      this.platos = data;
    }, (err) => {
      //
    });
  }

  crearNuevoPlato() {
    this.router.navigate(['nuevo'], { relativeTo: this.route })
  }

}
