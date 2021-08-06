import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from './../../services/cliente.service';
import { Cliente } from './../../models/cliente';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AdicionaClienteComponent } from './../adiciona-cliente/adiciona-cliente.component';
import { AtualizaClienteComponent } from './../atualiza-cliente/atualiza-cliente.component';
import { DetalheClienteComponent } from './../detalhe-cliente/detalhe-cliente.component';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent implements OnInit {

  constructor(private service: ClienteService,
              private dialog: MatDialog, 
              private auth: AuthService,
              private snackBar: MatSnackBar) { }
  clientes: Cliente[] = [];
  colunasTabela: string[] = ['id','nome', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.dataSource.paginator = this.paginator;
    this.listaClientes()
  }
  logout(){
    this.auth.logout();
  }
  abreWindowAdicionar(){
    const dialogRef = this.dialog.open(AdicionaClienteComponent, {
      width: '85%',
      height: '85%',
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(res => {
      this.listaClientes();
    })
  }

  abreWindowAtualizar(cliente: Cliente){
    const dialogRef = this.dialog.open(AtualizaClienteComponent, {
      width: '80%',
      height: '80%',
      autoFocus: true,
      data: cliente
    });
    dialogRef.afterClosed().subscribe(res => {
      this.listaClientes();
    });
  }

  abreWindowDetalhar(cliente: Cliente){
    const dialogRef = this.dialog.open(DetalheClienteComponent, {
      width: '80%',
      height: '80%',
      autoFocus: true,
      data: cliente
    });
  
  }

  abreModalConfirmacaoExclui(cliente: Cliente){
    Swal.fire({
      title: `Excluir Cliente`,
      html: `Você deseja realmente excluir o Cliente <b>${cliente.nome}</b> ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.exclui(cliente.id).subscribe(data => {
          this.snackBar.open('Sucesso', 'Cliente excluído com sucesso!');
          this.listaClientes();
        }, error => {
          this.snackBar.open('Erro', 'Erro ao tentar excluir Cliente');
        })
      }
    });
  }
    listaClientes(){
        this.service.listaClientes().subscribe((data) => {
          this.clientes = data;
          this.dataSource.data = data;
        }, (error:HttpErrorResponse) => {
          console.log(error)
        })   
    }
}
