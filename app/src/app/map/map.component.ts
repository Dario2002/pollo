import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Scuderie } from 'src/assets/Scuderie';
import { Piloti } from 'src/assets/Piloti';
import { Circuiti } from 'src/assets/Circuiti';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Marker } from '../models/marker.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  height = window.innerHeight;
  circuitoScelto;
  pilotaScelto;
  scuderiaScelto;

  lng: number = Circuiti.lista[5].lng;
  lat: number = Circuiti.lista[5].lat;

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

  pilota: string;
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



  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef) {

  }

//  iconCircuito = {
//    url: '',
//    scaledSize: {
//      width: 80,
//      height: 80
//    }
//  };


  iconCircuito: Marker;
  iconPilota : Marker;
  iconScuderia: Marker;

  submit() {
    let data = this.circuitoForm.value;
    let a;

    for (a in Circuiti.lista) {
      if (Circuiti.lista[a]['circuitRef'] == data.nome) {
        this.chosen = false;
        this.circuitoScelto = Circuiti.lista[a];
        this.iconCircuito = new Marker (`./assets/img/bandierina.png`, 80);
        this.lngcirc = this.circuitoScelto['lng'];
        this.latcirc = this.circuitoScelto['lat'];
        this.lng = this.circuitoScelto['lng'];
        this.lat = this.circuitoScelto['lat'];
        this.chosen = true;

      }
    }

    this.circuitoForm.reset();
  }

  submit1() {
    let data = this.pilotaForm.value;

    let a;
    for (a in Piloti.listaPil) {
      if (Piloti.listaPil[a]['driverRef'] == data.nome) {
        this.pilotaScelto = Piloti.listaPil[a];
        this.iconPilota = new Marker (`./assets/img/${this.pilotaScelto['driverRef'].toLowerCase()}.png`, 80);
        console.log(this.iconPilota);
        this.lngpil = this.pilotaScelto['lng'];
        this.latpil = this.pilotaScelto['lat'];
        this.lng = this.pilotaScelto['lng'];
        this.lat = this.pilotaScelto['lat'];
        this.chosen = true;

      }
    }
    console.log("ciao");

    this.pilotaForm.reset();

  }


  submit2() {
    let data = this.scuderiaForm.value;

    let a;
    for (a in Scuderie.listascud) {
      if (Scuderie.listascud[a]['constructorRef'] == data.nome) {
        this.scuderiaScelto = Scuderie.listascud[a];
        this.iconScuderia = new Marker (`./assets/img/${this.scuderiaScelto['constructorRef'].toLowerCase()}.png`, 80);
        this.lngscud = this.scuderiaScelto['lng'];
        this.latscud = this.scuderiaScelto['lat'];
        this.lng = this.scuderiaScelto['lng'];
        this.lat = this.scuderiaScelto['lat'];
        this.chosen = true;

      }
    }

    this.cd.detectChanges();
    this.scuderiaForm.reset();

  }



  onClick() {
    console.log("fungo")

  }
}
