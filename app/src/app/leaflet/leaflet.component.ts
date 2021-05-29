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
import { ApiService } from '../api.service';

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

  trovaForm = this.formBuilder.group({
    nome: ''
  });

  circuito: any = null;


  //iconaBool = false;

  onMapReady(map: Map) {
   this.map = map;
  }

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }


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

            `
            ${circuitoScelto.name} <br>
            <img src="${circuitoScelto.image}" width="200" height="100"> <br><br>
            LOCALITÀ: ${circuitoScelto.location}<br>
            NAZIONE: ${circuitoScelto.country} <br>
            LUNGHEZZA: ${circuitoScelto.Lunghezza}<br>
            CURVE: ${circuitoScelto.Curve} <br>
            INAUGURAZIONE: ${circuitoScelto.Inaugurazione} <br>
            TEMPO RECORD: ${circuitoScelto.TempoRecord} <br>
            DETENTORE: ${circuitoScelto.Detentore} <br>
            `
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
        this.iconapilota.bindPopup(

            `
            ${pilotaScelto.firstName} ${pilotaScelto.lastName} <br>
            <img src="${pilotaScelto.image}" width="175" height="175"> <br><br>
            NAZIONALITÀ: ${pilotaScelto.nationality} <br>
            LUOGO DI NASCITA: ${pilotaScelto.placeOfBirth} <br>
            DATA DI NASCITA: ${pilotaScelto.dateOfBirth} <br>
            AUTO: ${pilotaScelto.car}<br>
            NUMERO: ${pilotaScelto.number} <br>
            PODI: ${pilotaScelto.podiums}<br>
            POLE POSITIONS:${pilotaScelto.polePosition}<br>
            GP SVOLTI:${pilotaScelto.participatingGPs}<br>
            POSIZIONE MASSIMA OTTENUTA: ${pilotaScelto.highestposGPs}<br>
            PUNTI OTTENUTI: ${pilotaScelto.earnedPoint}<br>
            CAMPIONATI VINTI: ${pilotaScelto.championshipsWon} <br>

            `
          );

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

          this.iconascuderia.bindPopup(

            `
            ${scuderiaScelto.name}  <br>
            <img src="${scuderiaScelto.image}" width="175" height="175"> <br><br>
            ANNO DI ENTRATA: ${scuderiaScelto.firstTeamEntry} <br>
            BASE: ${scuderiaScelto.Base} <br>
            NAZIONE:${scuderiaScelto.Country}<br>
            TITOLI COSTRUTTORI: ${scuderiaScelto.WorldChampionships} <br>
            POSIZIONE PIÙ ALTA RAGGIUNTA:${scuderiaScelto.HighestRaceFinish}<br>
            POLE POSITIONS:${scuderiaScelto.PolePositions}<br>
            GIRI PIÙ VELOCI:${scuderiaScelto.FastestLaps}<br>
            PILOTI ATTUALI: ${scuderiaScelto.CurrentPilots} <br>
            `
          );

          this.iconascuderia.addTo(this.map);




        this.map.panTo(new L.LatLng( scuderiaScelto['lat'], scuderiaScelto['lng']));


        this.chosen = true;
      }
    }
    this.scuderiaForm.reset();

  }
  //this.map.removeLayer(markers);
  submitTrova(){
    let data = this.trovaForm.value;
    let coords;
    this.api.getCoords(data.nome).subscribe((data)=>{
      coords = data["results"][0]["geometry"];
      let c = this.api.getNearest(coords["lat"], coords["lng"]);
      console.log(c);
      this.iconacircuito = marker([c['lat'], c['lng']], {
          icon: icon({
            iconSize: [80, 80],
            iconAnchor: [40, 40],
            iconUrl: 'assets/img/bandierina.png',
            iconRetinaUrl: 'assets/img/bandierina.png'
            //shadowUrl: 'assets/img/bandierina.png'
          })
        })

        this.iconacircuito.bindPopup(

            `
            ${c.name} <br>
            <img src="${c.image}" width="200" height="100"> <br><br>
            LOCALITÀ: ${c.location}<br>
            NAZIONE: ${c.country} <br>
            LUNGHEZZA: ${c.Lunghezza}<br>
            CURVE: ${c.Curve} <br>
            INAUGURAZIONE: ${c.Inaugurazione} <br>
            TEMPO RECORD: ${c.TempoRecord} <br>
            DETENTORE: ${c.Detentore} <br>
            `
          );


          this.iconacircuito.addTo(this.map);
        this.map.panTo(new L.LatLng( c['lat'], c['lng']));
        this.chosen = true;
    });
    this.trovaForm.reset();
  }



  ngOnInit(): void {
  }

}
