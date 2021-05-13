import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gare',
  templateUrl: './gare.component.html',
  styleUrls: ['./gare.component.css']
})
export class GareComponent implements OnInit {
  races:any;
  searched: any;
  searchForm = this.formBuilder.group({
    year: ''
  });

  ngOnInit(){
    this.api.getRaces().subscribe(data=>{
      this.races=data;
    });

  }

constructor(private api: ApiService, private formBuilder: FormBuilder){ }

onSubmit() {
  let data = this.searchForm.value;

  this.api.getRacesByYear(data.year).subscribe((d1) => {
    this.searched = d1;
    console.log(d1);
  });

  this.searchForm.reset();
}

}







