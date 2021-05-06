import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('success') success: ElementRef;
  @ViewChild('alreadyRegistered') alreadyRegistered: ElementRef;
  @ViewChild('missingValues') missingValues: ElementRef;
  @ViewChild('pwd') pwdBox: ElementRef;
  @ViewChild('confirmPwd') confirmPwdBox: ElementRef;

  apiServiceObs: Observable<Object>;
  sshowPwd = false;
  sshowConfirmPwd = false;
  height = window.innerHeight;

  registrationForm = this.formBuilder.group({
    username: '',
    password: '',
    confirmPassword: ''
  });

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {  }

  result = 0;

  onSubmit(): void {
    let data = this.registrationForm.value;

    console.log(`Trying to register ${data.username}...`);

    if (data.password != data.confirmPassword) {
      this.result = 4;
      console.log('Errore! Le password non corrispondono');
    } else if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null) || (data.confirmPassword == "") || (data.confirmPassword == null) ) {
      console.log('Errore! Almeno un campo è vuoto');
      this.result = 1;
    } else {
      this.apiServiceObs = this.api.register(data.username, data.password);
      this.apiServiceObs.subscribe((d) => {
        if (d['status'] == 'done') {
          console.log('Registrazione eseguita correttamente');
          this.result = 3;
		  window.location.href = './login';
        } else if (d['status'] == 'existing_user'){
          console.log('Errore! Nome utente già registrato');
          this.result = 2;
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
        }
      });

    }

    this.registrationForm.reset();
  }

}
