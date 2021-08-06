import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente, Email, Telefone } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-atualiza-cliente',
  templateUrl: './atualiza-cliente.component.html',
  styleUrls: ['./atualiza-cliente.component.scss']
})
export class AtualizaClienteComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private service: ClienteService,
    private dialogRef: MatDialogRef<AtualizaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente:Cliente) { }
    formClienteUpdate: FormGroup;

  ngOnInit(): void {
    this.criaForm()
  }

  criaForm(){ 

    this.formClienteUpdate = this.fb.group({
      nome:[this.cliente.nome, Validators.required, Validators.maxLength(100), Validators.minLength(3)],
      cpf:[this.cliente.cpf, Validators.required],
      //endereco: this.criaFormGroupEndereco(),
      telefones: this.fb.array([]),
      emails: this.fb.array([])
    });
    
    //this.carregaFormEmail();
    //this.carregaFormTelefone();
}

criaFormGroupTelefone(){
  return this.fb.group({
    id:[''],
    tipotelefone: ['', Validators.required],
    numerotelefone: ['',Validators.required], 
    ddd: ['', Validators.required]
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

criaFormGroupEndereco(){
  return this.fb.group({
    id:[this.cliente.endereco.id],
    cep:[this.cliente.endereco.cep, Validators.required],
    logradouro:[this.cliente.endereco.logradouro, Validators.required],
    bairro:[this.cliente.endereco.bairro, Validators.required],
    cidade:[this.cliente.endereco.cidade,  Validators.required],
    uf:[this.cliente.endereco.uf, Validators.required],
    complemento:[this.cliente.endereco.complemento, ]
  })
}

// get telefonesFormArray(): FormArray {
//   return this.formClienteUpdate.get('telefones') as FormArray;
// }

// get emailsFormArray(): FormArray {
//   return this.formClienteUpdate.get('emails') as FormArray;
// }

close(){
  this.dialogRef.close();
}

}
