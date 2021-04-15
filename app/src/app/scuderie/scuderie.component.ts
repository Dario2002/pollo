import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Scuderie } from 'src/assets/Scuderie';
@Component({
  selector: 'app-scuderie',
  templateUrl: './scuderie.component.html',
  styleUrls: ['./scuderie.component.css']
})
export class ScuderieComponent {

constructor(private formBuilder: FormBuilder) { }

  searchForm = this.formBuilder.group({
    name: ''
  });

  scuderia: any;
  active: boolean;

  search() {
    let data = this.searchForm.value;
    this.active = false;

    for(let i in Scuderie.listascud) {
      if (Scuderie.listascud[i]['constructorRef'].toLowerCase() == data.name.toLowerCase()) {
        this.scuderia = Scuderie.listascud[i];
        this.active = true;
      }
    }

    this.searchForm.reset();
  }

}





