import { LoginGuard } from './_service/login-guard.service';
import { LoginService } from './_service/login.service';
import { ConsultaService } from './_service/consulta.service';
import { ConsumoService } from './_service/consumo.service';
import { PlatoFilterPipe } from './_pipe/plato-filter.pipe';
import { PlatoService } from './_service/plato.service';
import { ComboBoxDirective } from './_directive/combobox.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsumoComponent } from './consumo/consumo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlatoComponent } from './plato/plato.component';

import { AppRoutingModule } from './app-routing.module';
import { PlatoDetalleComponent } from './plato/plato-detalle/plato-detalle.component';
import { PlatoEdicionComponent } from './plato/plato-edicion/plato-edicion.component';
import { PlatoInicioComponent } from './plato/plato-inicio/plato-inicio.component';
import { PlatoListaComponent } from './plato/plato-lista/plato-lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DataTableModule} from "angular2-datatable";
import { HttpClientModule } from '@angular/common/http';
import { ConfirmModalComponent } from './componentes/modal/confirm-modal/confirm-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ClienteService } from './_service/cliente.service';
import { Ng2CompleterModule } from "ng2-completer";
import { DatePickerComponent } from './componentes/pickers/date-picker/date-picker.component';

import { TabsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SimpleModalComponent } from './componentes/modal/simple-modal/simple-modal.component';
import { LoginComponent } from './login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    ConsumoComponent,
    HeaderComponent,
    FooterComponent,
    PlatoComponent,
    ComboBoxDirective,
    PlatoDetalleComponent,
    PlatoEdicionComponent,
    PlatoInicioComponent,
    PlatoListaComponent,
    PlatoFilterPipe,
    ConfirmModalComponent,
    DatePickerComponent,
    SimpleModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy},
    PlatoService, ConsumoService, ConsultaService, ClienteService, LoginService, LoginGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
