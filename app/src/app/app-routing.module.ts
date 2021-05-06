import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { PilotComponent } from './pilot/pilot.component';
import { ScuderieComponent } from './scuderie/scuderie.component';
import { CircuitiComponent } from './circuiti/circuiti.component';
import { GareComponent } from './gare/gare.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'pilota', component: PilotComponent },
   { path: 'scuderie', component: ScuderieComponent },
  { path: 'circuiti', component: CircuitiComponent },
   { path: 'gare', component: GareComponent },
   { path: 'leaflet', component: LeafletComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
