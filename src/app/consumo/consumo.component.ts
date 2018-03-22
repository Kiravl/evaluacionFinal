import { ClienteService } from './../_service/cliente.service';
import { Detalle } from './../_model/detalle';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { Component, OnInit, Input } from '@angular/core';
import { Plato } from '../_model/plato';
import { Cliente } from '../_model/cliente';
import { Pedido } from '../_model/pedido';
import { ConsumoService } from '../_service/consumo.service';
import { PlatoService } from '../_service/plato.service';


@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

  busqueda: string;
  busquedaCliente: string;
  dataService: CompleterData;
  dataServiceCliente: CompleterData;
  platos: Plato[] = [];
  clientes: Cliente[] = [];
  plato: Plato;
  cantidad: number;
  cliente: Cliente;
  total: number = 0;
  flagMensaje: boolean = false;
  ////////////
  pedido: Pedido;
  detalle: Detalle[] = [];
  index: number = 0;
  filterQuery = "";
  filterQueryCliente = "";

  constructor(
    private consumoService: ConsumoService,
    private platoService: PlatoService,
    private completerService: CompleterService,
    private clienteService: ClienteService) {
    //this.platos = this.platoService.getPlatos();

    let obsPlatos = this.platoService.getPlatos();
    obsPlatos.subscribe(data => {
      this.platos = data;
      this.dataService = this.completerService.local(this.platos, 'nombre', 'nombre'); //busqueda, a mostrar tras la busqueda
    });

    let obsClientes = this.clienteService.getClientes();
    obsClientes.subscribe(data => {
      this.clientes = data;
      this.dataServiceCliente = this.completerService.local(this.clientes, 'nombreCompleto,dni', 'nombreCompleto');
    });
  }

  ngOnInit() {
    //this.detalle = this.consumoService.detalle;    
  }

  removerDetalle(det: Detalle) {
    this.total -= det.plato.precio * det.cantidad;

    //Para poder buscar la posicion independiente del paginado
    let indices = [];
    for (let i = 0; i < this.detalle.length; i++) {
      indices.push(this.detalle[i].index);
    }
    let index = indices.indexOf(det.index);

    this.detalle.splice(index, 1);
  }

  limpiarDetalle() {
    this.detalle = [];
    this.total = 0;
  }

  onItemSelect(selected: CompleterItem) {
    if (selected) {
      this.plato = selected.originalObject;
    }
  }

  onClienteSelect(selected: CompleterItem) {
    if (selected && selected.originalObject != null) {
      this.cliente = selected.originalObject;
      console.log(this.cliente);
    }
  }

  agregarADetalle() {
    this.flagMensaje = false;

    let det = new Detalle();
    det.plato = this.plato;
    det.cantidad = this.cantidad;
    det.index = this.index;

    if (det.plato !== null && det.cantidad > 0) {
      this.detalle.push(det);
      this.total += det.plato.precio * det.cantidad;
    } else {
      this.flagMensaje = true;
    }

    this.index++;
  }

  confirmar(event) {
    if (event) {

      for (let i = 0; i < this.detalle.length; i++) {
        let det = this.detalle[i];

        //delete det.plato.nombre;
        //delete det.plato.precio;
        delete det.plato.urlImagen;
      }

      if (this.cliente == null) {
        let obs = this.clienteService.registrar(this.busquedaCliente);
        obs.subscribe(data => {

          let jsonPedido = `{      
            "cliente" : {
                "_id" : "${data}",
                "nombreCompleto" : "${this.busquedaCliente}"
            },
            "fechaPedido" : "${new Date().toLocaleDateString()}",
            "total" : ${this.total},
            "detalle" : ${JSON.stringify(this.detalle)}
        }`;
          let json = JSON.parse(jsonPedido);
          //Enviar al servicio
          this.consumoService.registrar(json).subscribe(data => {
          });

        });
      } else {
        let jsonPedido = `{      
          "cliente" : {
              "_id" : "${this.cliente._id}",
              "nombreCompleto" : "${this.busquedaCliente}"
          },
          "fechaPedido" : "${new Date().toLocaleDateString()}",
          "total" : ${this.total},
          "detalle" : ${JSON.stringify(this.detalle)}
      }`;
        let json = JSON.parse(jsonPedido);
        //Enviar al servicio
        this.consumoService.registrar(json).subscribe(data => {
        });
      }
    }

    setTimeout(() => {
      this.cliente = null;
      this.detalle = [];
      this.busqueda = null;
      this.busquedaCliente = null;
      this.cantidad = 0;
      this.total = 0;
    }, 2000);
  }
}

/*
{
	"_id" : "5a1ce9a619d87201dc4d49ce",
    "cliente" : {
        "_id" : "5a1ccb770bc30dd3cb5622d0"        
    },
    "fechaPedido" : "9/11/2017",
    "total" : 941.52,
    "detalle" : [
	    	{
	    		"plato"	: {
            "_id" : "5a1c90190bc30dd3cb56168e",
            "nombre" : "Hamburguesa",
            "precio" : "15"
	    		},
	    		"cantidad" : 3
	    	},
	    	{
	    		"plato"	: {
            "_id" : "5a1c90190bc30dd3cb56168e",
            "nombre" : "Hamburguesa",
            "precio" : "15"
	    		},
	    		"cantidad" : 3
	    	},
	    	{
	    		"plato"	: {
            "_id": "5a1c90190bc30dd3cb56168e",
            "nombre" : "Hamburguesa",
            "precio" : "15"
	    		},
	    		"cantidad" : 1
	    	}
    	]
}
*/