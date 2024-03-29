import { Component, ViewChild, ElementRef } from '@angular/core';
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

pilota:string;
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

    iconCircuito =  {
        url:'',
        scaledSize: {
        width: 150,
        height: 60
      }
    };


    iconPilota =  {
        url:'',
        scaledSize: {
        width: 70,
        height: 70
      }
    };


    iconScuderia =  {
        url:'',
        scaledSize: {
        width: 140,
        height: 35
      }
    };

  submit() {
    let data = this.circuitoForm.value;
    let a;

    for (a in Circuiti.lista) {
      if (Circuiti.lista[a]['circuitRef'] == data.nome) {
        this.chosen = false;
        this.circuitoScelto = Circuiti.lista[a];
        this.iconCircuito['url'] = `./assets/img/${this.circuitoScelto['circuitRef'].toLowerCase()}.png`;
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
        if (Piloti.listaPil[a]['driverRef'] == data.nome) {
            this.pilotaScelto = Piloti.listaPil[a];
            this.iconPilota['url']=`./assets/img/${this.pilotaScelto['driverRef'].toLowerCase()}.png`;
            this.lngpil = this.pilotaScelto['lng'];
            this.latpil = this.pilotaScelto['lat'];
            this.chosen = true;
        }
        }

        this.pilotaForm.reset();

    }


  submit2() {
    let data = this.scuderiaForm.value;

    let a;
    for (a in Scuderie.listascud) {
      if (Scuderie.listascud[a]['constructorRef'] == data.nome) {
        this.scuderiaScelto = Scuderie.listascud[a];
        this.iconScuderia['url']=`./assets/img/${this.scuderiaScelto['constructorRef'].toLowerCase()}.png`;
        this.lngscud = this.scuderiaScelto['lng'];
        this.latscud = this.scuderiaScelto['lat'];
        this.chosen = true;
      }
    }

    this.scuderiaForm.reset();

  }



  onClick()
  {
  console.log("fungo")

  }
}





