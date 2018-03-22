import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Input() opcion: string;
  @Output() emision: EventEmitter<Date[]> = new EventEmitter<Date[]>();  

  minDate = new Date(2010, 1, 1);  //yyyy-MM-dd
  maxDate = new Date();

  fecha: Date = new Date();
  bsRangeValue: Date[] = [new Date(), new Date()];

  constructor(private _localeService: BsLocaleService) {

    defineLocale('es', esLocale);    
    this._localeService.use('es');
    //this.bsConfig = Object.assign({}, { locale: 'es' });
  }

  buscar() {
    //Si es fecha unica solo devuevlo el array con 1 elemento
    if (this.opcion === 'U') {
      //console.log(this.fecha);
      this.bsRangeValue = [];
      this.bsRangeValue.push(this.fecha);
    }
    this.emision.emit(this.bsRangeValue);
  }

}
