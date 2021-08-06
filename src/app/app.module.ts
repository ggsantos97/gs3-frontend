import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListaClienteComponent } from './Cliente/lista-cliente/lista-cliente.component';
import { AdicionaClienteComponent } from './Cliente/adiciona-cliente/adiciona-cliente.component';
import { AtualizaClienteComponent } from './Cliente/atualiza-cliente/atualiza-cliente.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NgxMaskModule } from 'ngx-mask';
import { DetalheClienteComponent } from './Cliente/detalhe-cliente/detalhe-cliente.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaClienteComponent,
    AdicionaClienteComponent,
    AtualizaClienteComponent,
    DetalheClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    NgxViacepModule,
    
  ],
  providers: [ AuthService, AuthGuardService,
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true},
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
