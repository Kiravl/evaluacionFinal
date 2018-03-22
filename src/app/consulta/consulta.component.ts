import { ConsultaService } from './../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../_model/pedido';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  
  pedidos: Pedido[];

  constructor(private consultaService: ConsultaService) { }

  ngOnInit() {
  }

  obtenerFecha(event){
    console.log(event);
    this.buscar(event);
  }

  buscar(fechas: Date[]) {
    //console.log(fecha);    
    let cantidad = fechas.length;
    let tipoRango = "M";
    
    //gte 13/03/2018 00 lt 14/03/2018 
    if(cantidad === 1){
      tipoRango = "U";
      fechas[1] = new Date(); //instancia      
      fechas[1].setDate(fechas[0].getDate() + 1); //dia siguiente      
    }

    let date1 = fechas[0]; 
    let fecha1 = new Date(date1.getTime() - (date1.getTimezoneOffset() * 60000)).toISOString();    

    let date2 = fechas[1];
    date2.setHours(23);
    date2.setMinutes(59);
    date2.setSeconds(59);    
    let fecha2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).toISOString();    

    console.log(fecha1);
    console.log(fecha2);
    
    console.log(fecha1.substring(0, fecha1.indexOf('T')));
    console.log(fecha2.substring(0, fecha2.indexOf('T')));

    if(tipoRango === "U"){
      let obs = this.consultaService.getPedidos(tipoRango, fecha1.substring(0, fecha1.indexOf('T')), fecha2.substring(0, fecha2.indexOf('T')));
      obs.subscribe(data => {
        //console.log(data);
        this.pedidos = data;
      });
    }else{
      //console.log(fecha2);
      let obs = this.consultaService.getPedidos(tipoRango, fecha1.substring(0, fecha1.indexOf('T')), fecha2);
      obs.subscribe(data => {
        //console.log(data);
        this.pedidos = data;
      });
    }    
    
  }

  cambio(event){  
    this.pedidos = [];
  }

}

