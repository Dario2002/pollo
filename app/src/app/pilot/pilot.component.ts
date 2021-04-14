import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Piloti } from 'src/assets/Piloti';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent {

  constructor(private formBuilder: FormBuilder) { }

  searchForm = this.formBuilder.group({
    name: ''
  });

  pilota: any;
  active: boolean;

  search() {
    let data = this.searchForm.value;
    this.active = false;

    for(let i in Piloti.listaPil) {
      if (Piloti.listaPil[i]['driverRef'].toLowerCase() == data.name.toLowerCase()) {
        this.pilota = Piloti.listaPil[i];
        this.active = true;
      }
    }

    this.searchForm.reset();
  }

}
