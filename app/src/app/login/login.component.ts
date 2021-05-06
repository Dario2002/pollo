import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as bcrypt from "bcryptjs";
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('success') success: ElementRef;
  @ViewChild('wrongUsernameOrPassword') wrongUsernameOrPassword: ElementRef;
  @ViewChild('pwd') pwdBox: ElementRef;

  apiServiceObs: Observable<Object>;
  result = 0;
  sshow = false;
  height = window.innerHeight;

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  // per prendere il nome utente localStorage.getItem('token');

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder) {  }

  onSubmit(): void {
    let data = this.loginForm.value;

    console.log(`Trying to login ${data.username}...`);
    if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null)) {
      console.log('Dati mancanti!');
      this.result = 1;
    } else {
      this.result = 0;
      this.apiServiceObs = this.api.login(data.username, data.password);
      this.apiServiceObs.subscribe((content) => {
        if (bcrypt.compareSync(data.password, content[0]["password"])) {
          this.api.setLogStatus(true);
          localStorage.setItem('token', data.username);
          window.location.href = './home';
        } else { this.result = 1; }
      });
    }

    this.loginForm.reset();
  }

}
