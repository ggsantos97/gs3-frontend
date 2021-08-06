import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
formLogin: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  login(){
    this.auth.login(this.formLogin.value);
  }

}
