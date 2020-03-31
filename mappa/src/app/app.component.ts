import { Component } from '@angular/core';

type NewType = point;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'server mappe';
  //Aggiungiamo latitudine e longitudine di un luogo
  lat: number = 45.506738;
  lng: number = 9.190766;
  latcasa: number = 45.533758;
  lngcasa: number = 9.145441;
  lnggatto: number = 9.1;
  latgatto: number = 45.5;
  latgatto1:number= 45.395480;
  lnggatto1:number= 9.236814;

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

    triangle: Array<point> =
      [
        {lng:9.1, lat:45.5},
        {lng:9.0, lat:45.6},
        {lng:9.0, lat:45.4}
      ]

  onClick()
  {
  console.log("fungo")

  }
}





