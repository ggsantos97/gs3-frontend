
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CEPError, NgxViacepService } from '@brunoc/ngx-viacep';
import { Cliente } from 'src/app/models/cliente';
import { Endereco } from 'src/app/models/endereco';
import { ViacepService } from 'src/app/services/viacep.service';
import { ClienteService } from './../../services/cliente.service';

@Component({
  selector: 'app-adiciona-cliente',
  templateUrl: './adiciona-cliente.component.html',
  styleUrls: ['./adiciona-cliente.component.scss']
})
export class AdicionaClienteComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private cepService:  NgxViacepService ,
              private snacBar: MatSnackBar,
              private service: ClienteService,
              private dialogRef: MatDialogRef<AdicionaClienteComponent>) { }
formClienteAdd: FormGroup;
cep: string;
cliente: Cliente;
public  customPatterns  =  {  '0' : {  pattern : new  RegExp ( '\ [a-zA-Z \]' ) }  } ;
  ngOnInit(): void {
      this.criaForm();
  }

  criaForm(){ 
      this.formClienteAdd = this.fb.group({
        nome:['', Validators.required, [Validators.maxLength(100), Validators.minLength(3)]],
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
      cep:['', Validators.required],
      logradouro:['',Validators.required],
      bairro:['',Validators.required],
      cidade:['',Validators.required],
      uf:['',Validators.required],
      complemento:['']
    })
  }
  getTelefoneMask(value: string): string {
    return (value && value.length > 8) ? '0 0000-0009' : '0000-00009';
  }
  get telefonesFormArray(): FormArray {
    return this.formClienteAdd.get('telefones') as FormArray;
  }

  get emailsFormArray(): FormArray {
    return this.formClienteAdd.get('emails') as FormArray;
  }

  adicionaTelefone() {
    this.telefonesFormArray.push(this.criaFormGroupTelefone());
    this.formClienteAdd.patchValue(this.cliente);
  }

  removeTelefones(posicao: number) {
    this.telefonesFormArray.controls.splice(posicao, 1);
    this.formClienteAdd.controls.telefones.value.splice(posicao, 1);
    this.formClienteAdd.patchValue(this.cliente);
  }

  adicionaEmail() {
    this.emailsFormArray.push(this.criaFormGroupEmail());
    this.formClienteAdd.patchValue(this.cliente);
  }

  removeEmail(posicao: number) {
    this.emailsFormArray.controls.splice(posicao, 1);
    this.formClienteAdd.controls.emails.value.splice(posicao, 1);
    this.formClienteAdd.patchValue(this.cliente);
  }

  close(){
    this.dialogRef.close();
  }
  limpaForm() {
    this.formClienteAdd.reset();
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

  salva(){
    if(this.formClienteAdd.invalid){
      this.snacBar.open('ERRO', 'Formulário inválido',{
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'});
    }else {
      this.cliente= this.formClienteAdd.value;
      this.service.salva(this.cliente).subscribe( data => {
        this.snacBar.open('Sucesso', 'Cliente Salvo5100',{
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'});
          this.dialogRef.close(data);
      }, error =>  {
        console.log(error)
        this.snacBar.open('ERRO', 'Erro ao tentar salvar Cliente',{
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'});
      }); 
    }
 
    
  }
}
