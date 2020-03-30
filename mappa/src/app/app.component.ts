import { Component } from '@angular/core';

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

    private icon =  {
      url:'./assets/img/cat_acrobat.ico',
     scaledSize: {
        width: 60,
        height: 60
      }
    };

}





