import { Component } from '@angular/core';
import { Circuiti } from '../assets/Circuiti'
import { Piloti } from '../assets/Piloti'
import { Scuderie } from '../assets/Scuderie'
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {
  height = window.innerHeight;
  title = 'server mappe';
  circuitoScelto;
  pilotaScelto;
  scuderiaScelto;
  //Aggiungiamo latitudine e longitudine di un luogo
  lng: number = Circuiti.lista[1].lng;
  lat: number = Circuiti.lista[1].lat;

  //lng: number = Piloti.listaPil[1].lng;
  //lat: number = Piloti.listaPil[1].lat;
  //latcasa: number = 45.533758;
  //lngcasa: number = 9.145441;
  //lnggatto: number = 9.1;
  //latgatto: number = 45.5;
  //latgatto1:number= 45.395480;
  //lnggatto1:number= 9.236814;

  lngcirc;
  latcirc;
  latpil;
  lngpil;
  latscud;
  lngscud;

  chosen: boolean = false;


  circuitoForm = this.formBuilder.group({
    nome: ''
  });

  pilotaForm = this.formBuilder.group({
    nome: ''
  });

  scuderiaForm = this.formBuilder.group({
    nome: ''
  });



constructor(private formBuilder: FormBuilder) {

}

    private icon =  {
        url:'./assets/img/cat_acrobat.ico',
        scaledSize: {
        width: 60,
        height: 60
      }
    };
    private icon1 =  {
        url:'./assets/img/cat_acrobat.ico',
        scaledSize: {
        width: 60,
        height: 60
      }
    };

  submit() {
    let data = this.circuitoForm.value;

    let a;
    for (a in Circuiti.lista) {
      if (Circuiti.lista[a]['name'] == data.nome) {
        this.circuitoScelto = Circuiti.lista[a];
        this.lngcirc = this.circuitoScelto['lng'];
        this.latcirc = this.circuitoScelto['lat'];
        this.chosen = true;
      }
    }

    this.circuitoForm.reset();

  }

    submit1() {
    let data = this.pilotaForm.value;

    let a;
    for (a in Piloti.listaPil) {
      if (Piloti.listaPil[a]['lastName'] == data.nome) {
        this.pilotaScelto = Piloti.listaPil[a];
        this.lngcirc = this.  pilotaScelto['lng'];
        this.latcirc = this.pilotaScelto['lat'];
        this.chosen = true;
      }
    }

    this.pilotaForm.reset();

  }
    submit2() {
    let data = this.scuderiaForm.value;

    let a;
    for (a in Scuderie.listascud) {
      if (Scuderie.listascud[a]['Base'] == data.nome) {
        this.scuderiaScelto = Circuiti.lista[a];
        this.lngscud = this.scuderiaScelto['lng'];
        this.latscud = this.scuderiaScelto['lat'];
        this.chosen = true;
      }
    }

    this.circuitoForm.reset();

  }


  onClick()
  {
  console.log("fungo")

  }
}





