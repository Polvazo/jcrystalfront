import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManagerHello } from './jcrystal/services/ManagerHello';
import { ManagerGreetings } from './jcrystal/services/ManagerGreetings';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public http: HttpClient) { }
  name = 'hola';
 
  onClick() {
    
    ManagerGreetings.greetings(this,"Julio" ,resp => {
        alert(resp)
        AppComponent.= "resp";
    }, error => {
    });
  }

  

title = 'test-jcrystal2';
}

function setNombre (nombre){
  this.name = nombre;
};
