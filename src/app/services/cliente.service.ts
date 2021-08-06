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

    salva(cliente: Cliente): Observable<Cliente>{
      return this.http.post<any>(`${this.API}`,  cliente);
    }

    atualiza(cliente: Cliente, id:number): Observable<Cliente>{
      return this.http.put<any>(`${this.API}/${id}`,  cliente);
    }

    exclui(id: number): Observable<any> {
      return this.http.delete<any>(`${this.API}/${id}`);
    }
}
