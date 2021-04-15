import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Circuiti } from 'src/assets/Circuiti';
@Component({
  selector: 'app-circuiti',
  templateUrl: './circuiti.component.html',
  styleUrls: ['./circuiti.component.css']
})
export class CircuitiComponent  {

constructor(private formBuilder: FormBuilder) { }

  searchForm = this.formBuilder.group({
    name: ''
  });

  circuito: any;
  active: boolean;

  search() {
    let data = this.searchForm.value;
    this.active = false;

    for(let i in Circuiti.lista) {
      if (Circuiti.lista[i]['circuitRef'].toLowerCase() == data.name.toLowerCase()) {
        this.circuito = Circuiti.lista[i];
        this.active = true;
      }
    }

    this.searchForm.reset();
  }

}





