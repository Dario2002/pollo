import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedin: boolean;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if(!!localStorage.getItem('token')){
      this.api.setLogStatus(true);
    }
    this.refreshLogStatus();
  }

  public refreshLogStatus(): void {
    this.loggedin = this.api.loggedin;
  }

  logout(): void{
    localStorage.removeItem('token');
  }

  a = setInterval(() => { this.refreshLogStatus() }, 1000);

}
