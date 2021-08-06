import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Endereco } from './../models/endereco';
@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  API = `${environment.API_CEP}`
  constructor(private http: HttpClient) {
  }

    buscaEnderecoPorCep(cep: string): Observable<Endereco> {
      return this.http.get<any>(`${this.API}${cep}/json`);
    }
   
}
