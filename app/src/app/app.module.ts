import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { PilotComponent } from './pilot/pilot.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScuderieComponent } from './scuderie/scuderie.component';
import { CircuitiComponent } from './circuiti/circuiti.component';
import { GareComponent } from './gare/gare.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    PilotComponent,
    ScuderieComponent,
    CircuitiComponent,
    GareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBOtW-5KsaDrzQ41dtkFjPceCEu6Ny-B-s'}),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
