import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from './../../services/cliente.service';

@Component({
  selector: 'app-adiciona-cliente',
  templateUrl: './adiciona-cliente.component.html',
  styleUrls: ['./adiciona-cliente.component.scss']
})
export class AdicionaClienteComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service: ClienteService,
              private dialogRef: MatDialogRef<AdicionaClienteComponent>) { }
formClienteAdd: FormGroup;
  ngOnInit(): void {
      this.criaForm();
  }

  criaForm(){ 
      this.formClienteAdd = this.fb.group({
        nome:['', Validators.required, Validators.maxLength(100), Validators.minLength(3)],
        cpf:['', Validators.required],
        endereco: this.criaFormGroupEndereco(),
        telefones: this.fb.array([this.criaFormGroupTelefone()]),
        emails: this.fb.array([this.criaFormGroupEmail()])
      });
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
      endereco:['',Validators.required]
    });
  }

  criaFormGroupEndereco(){
    return this.fb.group({
      id:[''],
      cep:[''],
      logradouro:[''],
      bairro:[''],
      cidade:[''],
      uf:[''],
      complemento:['']
    })
  }

  get telefonesFormArray(): FormArray {
    return this.formClienteAdd.get('telefones') as FormArray;
  }

  get emailsFormArray(): FormArray {
    return this.formClienteAdd.get('emails') as FormArray;
  }

  close(){
    this.dialogRef.close();
  }

}
