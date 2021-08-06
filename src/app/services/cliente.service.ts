import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from './../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  API = `${environment.API}/clientes`;
  constructor(private http: HttpClient) { }

    listaClientes(): Observable<Cliente[]>{
      return this.http.get<any>(`${this.API}`);
    }
}
