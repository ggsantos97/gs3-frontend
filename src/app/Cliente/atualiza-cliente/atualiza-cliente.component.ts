import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { Cliente, Email, Telefone } from 'src/app/models/cliente';
import { Endereco } from 'src/app/models/endereco';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-atualiza-cliente',
  templateUrl: './atualiza-cliente.component.html',
  styleUrls: ['./atualiza-cliente.component.scss']
})
export class AtualizaClienteComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private service: ClienteService,
    private cepService:  NgxViacepService ,
    private dialogRef: MatDialogRef<AtualizaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente:Cliente,
    private snacBar: MatSnackBar,) {
      
     }
    formClienteUpdate: FormGroup;
    cep: string;
  ngOnInit(): void {
    this.criaForm();
  }

  criaForm(){ 

    this.formClienteUpdate = this.fb.group({
      id:[this.cliente.id],
      nome:[this.cliente.nome, Validators.required],
      cpf:[this.cliente.cpf, Validators.required],
      endereco: this.carregaFormGroupEndereco(),
      telefones: this.fb.array([]),
      emails: this.fb.array([])
    });
    
    this.carregaFormEmail();
    this.carregaFormTelefone();
}

criaFormGroupTelefone(){
  return this.fb.group({
    id:[''],
    tipotelefone: ['', Validators.required],
    numerotelefone: ['',Validators.required], 
    ddd: ['', Validators.required]
  });
}
criaFormGroupEmail(){
  return this.fb.group({
    id:[''],
    endereco: ['', Validators.required],
  });
}

carregaFormEmail(){
  const form = this.formClienteUpdate.get('emails') as FormArray
  this.cliente.emails.forEach(e => {
    form.push(this.setEmail(e));
  })
}

carregaFormTelefone(){
  const form = this.formClienteUpdate.get('telefones') as FormArray
  this.cliente.telefones.forEach(t => {
    form.push(this.setTelefone(t));
  })
}


setEmail(email: Email): FormGroup{
  return this.fb.group({
    endereco:[email.endereco, ]
  })
}

setTelefone(telefone: Telefone): FormGroup{
  return this.fb.group({
    tipotelefone: [telefone.tipotelefone, Validators.required],
    numerotelefone: [telefone.numerotelefone,Validators.required], 
    ddd: [telefone.ddd, Validators.required]
  })
}

carregaFormGroupEndereco(){
  return this.fb.group({
    id:[this.cliente.endereco.id],
    cep:[this.cliente.endereco.cep, Validators.required],
    logradouro:[this.cliente.endereco.logradouro, Validators.required],
    bairro:[this.cliente.endereco.bairro, Validators.required],
    cidade:[this.cliente.endereco.cidade,  Validators.required],
    uf:[this.cliente.endereco.uf, Validators.required],
    complemento:[this.cliente.endereco.complemento, ]
  });
}

get telefonesFormArray(): FormArray {
  return this.formClienteUpdate.get('telefones') as FormArray;
}

get emailsFormArray(): FormArray {
  return this.formClienteUpdate.get('emails') as FormArray;
}


adicionaTelefone() {
  this.telefonesFormArray.push(this.criaFormGroupTelefone());
}

removeTelefones(posicao: number) {
  this.telefonesFormArray.removeAt(posicao);
}

adicionaEmail() {
  this.emailsFormArray.push(this.criaFormGroupEmail());
  
}

removeEmail(posicao: number) {
  this.emailsFormArray.removeAt(posicao);
}

close(){
  this.dialogRef.close();
}
limpaForm() {
  this.formClienteUpdate.reset();
}
buscaEnderecoPorCep( ) {
  if(this.cep == '' && this.cep == null){
    this.snacBar.open('Erro', 'Digite um cep válido');
  }
    this.cepService
    .buscarPorCep(this.cep)  
    .subscribe((endereco: Endereco) => {
      // Endereço retornado :)
      console.log(endereco);
    });
    
}

atualiza(){
  this.cliente= this.formClienteUpdate.value;
  this.service.atualiza(this.cliente, this.cliente.id).subscribe( data => {
    this.snacBar.open('Sucesso', 'Cliente Atualizado!!',{
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'});
      this.dialogRef.close(data);
  }, error =>  {
    this.snacBar.open('ERRO', 'Erro ao tentar Atualizar Cliente',{
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'});
  }); 
}

}
