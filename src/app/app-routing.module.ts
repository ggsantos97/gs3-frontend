import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListaClienteComponent } from './Cliente/lista-cliente/lista-cliente.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: ListaClienteComponent, canActivate:[AuthGuardService], pathMatch:'full'},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
