import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://serverracemap.netlify.app/.netlify/functions/api/index/';
  salt = "$2a$10$Zbuw7MUyyijfl/PsltUuHu";
  loggedin = false;
  circuits: any;

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

  getRaces() {
    let url = `${this.url}races`;

    let content = this.http.get(url);

    return content;
  }

    getCircuits() {
    let url = `${this.url}circuiti`;

    let content = this.http.get(url);

    content.subscribe((data)=>{
      this.circuits = data;
    });
  }
  getRacesByYear(y:number) {
    let url = `${this.url}anno/${y}`;

    let content = this.http.get(url);

    return content;
  }

  setLogStatus(status: true) {
    this.loggedin = true;
  }

  getCoords(place: string){
    let geocoding= `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=2ee929ce7fde4c9db04e1cbd2cf69a23`;
    let content = this.http.get(geocoding);
    return content;
  }

  getNearest(lat: number, lon: number){
    let min = 20037.5; //km, metà equatore
    let c: any;

    for (let i in this.circuits){
      let lat2 = this.circuits[i]["lat"];
      let lon2 = this.circuits[i]["lng"];
    	var radlat1 = Math.PI * lat/180;
    	var radlat2 = Math.PI * lat2/180;
    	var theta = lon-lon2;
    	var radtheta = Math.PI * theta/180;
    	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist) * 180/Math.PI  * 60 * 1.1515 * 1.609344;
      if (dist < min){
        min = dist;
        c = this.circuits[i];
      }
    }
    return c;
    }
}
