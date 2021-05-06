import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://3000-bronze-sheep-v2awktol.ws-eu03.gitpod.io/';
  salt = "$2a$10$Zbuw7MUyyijfl/PsltUuHu";
  loggedin = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let url = `${this.url}login/${username}`;

    let content = this.http.get(url);

    return content;
  }

  register(username: string, password: string) {
    let pwd = bcrypt.hashSync(password, this.salt);

    let url = `${this.url}register`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('pwd', pwd);

    let content = this.http.post(url, body, { headers: myheader });

    return content;
  }

  setLogStatus(status: true) {
    this.loggedin = true;
  }

}
