import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Scuderie } from 'src/assets/Scuderie';
import { Piloti } from 'src/assets/Piloti';
import { Circuiti } from 'src/assets/Circuiti';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Marker } from '../models/marker.model';
import { icon, Map, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {

  lng: number = Circuiti.lista[5].lng;
  lat: number = Circuiti.lista[5].lat;
  chosen: boolean = false;
  map : Map;
  circuitoForm = this.formBuilder.group({
    nome: ''
  });
  pilotaForm = this.formBuilder.group({
    nome: ''
  });

  scuderiaForm = this.formBuilder.group({
    nome: ''
  });
  circuito: any = null;


  //iconaBool = false;

  onMapReady(map: Map) {
   this.map = map;
  }

  constructor(private formBuilder: FormBuilder) { }


  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Marker for the top of Mt. Ranier
  summit = marker([46.8523, -121.7603], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/img/bandierina.png',
      //shadowUrl: 'assets/img/bandierina.png'
    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([46.78465227596462, -121.74141269177198], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/img/bandierina.png',
      iconRetinaUrl: 'assets/img/bandierina.png',
      //shadowUrl: 'assets/img/bandierina.png'
    })
  });



  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
    }
  };

  options = {
    layers: [this.streetMaps],
    zoom: 7,
    center: latLng([46.879966, -121.726909])
  };

  iconacircuito;

  submitCircuito() {


    if(this.iconacircuito != undefined)
    {
      console.log(this.iconacircuito);
      this.iconacircuito.removeFrom(this.map);
    }

    let data = this.circuitoForm.value;
    let a;
    let circuito;

    for (a in Circuiti.lista) {
      console.log(Circuiti.lista[a]['circuitRef'] );
      if (Circuiti.lista[a]['circuitRef'] == data.nome) {
        this.chosen = false;
        let circuitoScelto = Circuiti.lista[a];
        this.iconacircuito = marker([circuitoScelto['lat'], circuitoScelto['lng']], {
          icon: icon({
            iconSize: [80, 80],
            iconAnchor: [40, 40],
            iconUrl: 'assets/img/bandierina.png',
            iconRetinaUrl: 'assets/img/bandierina.png'
            //shadowUrl: 'assets/img/bandierina.png'
          })
        })
          this.iconacircuito.bindPopup(
            "NAZIONALITÀ: {{pilota.nationality}}"
          );

          this.iconacircuito.addTo(this.map);

        this.map.panTo(new L.LatLng( circuitoScelto['lat'], circuitoScelto['lng']));

        console.log(circuito);

        this.chosen = true;
      }
    }
    this.circuitoForm.reset();

  }
  iconapilota;

  submitPilota() {
    let data = this.pilotaForm.value;
    let a;

    if(this.iconapilota != undefined)
    {
      console.log(this.iconapilota);
      this.iconapilota.removeFrom(this.map);
    }


    for (a in Piloti.listaPil) {
      console.log(Piloti.listaPil[a]['driverRef'] );
      if (Piloti.listaPil[a]['driverRef'] == data.nome) {
        this.chosen = false;
        let pilotaScelto = Piloti.listaPil[a];

        this.iconapilota = marker([pilotaScelto['lat'], pilotaScelto['lng']], {
          icon: icon({

            iconSize: [80, 80],
            iconAnchor: [40, 40],
            iconUrl: `./assets/img/${pilotaScelto['driverRef'].toLowerCase()}.png`,
            iconRetinaUrl: `./assets/img/${pilotaScelto['driverRef'].toLowerCase()}.png`

            //shadowUrl: 'assets/img/bandierina.png'

          })
        })


          this.iconapilota.addTo(this.map);




        this.map.panTo(new L.LatLng( pilotaScelto['lat'], pilotaScelto['lng']));


        this.chosen = true;
      }
    }
    this.pilotaForm.reset();

  }
  iconascuderia;

  submitScuderia() {
    let data = this.scuderiaForm.value;
    let a;

    if(this.iconascuderia != undefined)
    {
      console.log(this.iconascuderia);
      this.iconascuderia.removeFrom(this.map);
    }

    for (a in Scuderie.listascud) {
      console.log(Scuderie.listascud[a]['constructorRef'] );
      if (Scuderie.listascud[a]['constructorRef'] == data.nome) {
        this.chosen = false;
        let scuderiaScelto = Scuderie.listascud[a];

        this.iconascuderia = marker([scuderiaScelto['lat'], scuderiaScelto['lng']], {
          icon: icon({

            iconSize: [80, 80],
            iconAnchor: [40, 40],
            iconUrl: `./assets/img/${scuderiaScelto['constructorRef'].toLowerCase()}.png`,
            iconRetinaUrl: `./assets/img/${scuderiaScelto['constructorRef'].toLowerCase()}.png`

            //shadowUrl: 'assets/img/bandierina.png'

          })
        })


          this.iconascuderia.addTo(this.map);




        this.map.panTo(new L.LatLng( scuderiaScelto['lat'], scuderiaScelto['lng']));


        this.chosen = true;
      }
    }
    this.scuderiaForm.reset();

  }
  //this.map.removeLayer(markers);




  ngOnInit(): void {
  }

}
