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

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent implements OnInit {

  constructor(private service: ClienteService,
              private dialog: MatDialog) { }
  clientes: Cliente[] = [];
  colunasTabela: string[] = ['id','nome', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.dataSource.paginator = this.paginator;
    this.listaClientes()
  }
  teste(){

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
    listaClientes(){
        this.service.listaClientes().subscribe((data) => {
          this.clientes = data;
          this.dataSource.data = data;
        }, (error:HttpErrorResponse) => {
          console.log(error)
        })   
    }
}
