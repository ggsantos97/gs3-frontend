import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login } from './../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userBehaviorSubject = new BehaviorSubject<Login>(new Login())
  constructor(private router: Router,
    private snackBar: MatSnackBar) { }

  login(login: Login){
    if( (login.usuario == 'admin' && login.senha == "123456") || (login.usuario == 'comun' && login.senha == "123456") ){
      let autenticao = btoa(`${login.usuario}:${login.senha}`);   
      sessionStorage.setItem('token', autenticao);
      this.router.navigate(['']);
      this.emiteUsuarioLogado(login);
    }else{
        this.snackBar.open('ERRO','Usuário não está cadastrado no sistema!',{
          duration: 3000,
           horizontalPosition: 'end',
         verticalPosition: 'top'
        });
    }
  }

  usuaruiLogado(){
    let user = sessionStorage.getItem('token');
    return !(user === null);
  }

  emiteUsuarioLogado(login: Login){
    return this._userBehaviorSubject.next(login)
  }

  obterUsuarioLogado(){
    return this._userBehaviorSubject
  }

  logout(){
    sessionStorage.removeItem('token')
    this.router.navigate(['login']);
  }
}
