import { Component, OnInit } from '@angular/core';
import { ConsolasService } from "../../servicios/consolas.service";

@Component({
  selector: 'app-consolas',
  templateUrl: './consolas.component.html',
  styleUrls: ['./consolas.component.css']
})
export class ConsolasComponent implements OnInit {

  //Vamos a utilizer el pipe async que solo puede recibir un Observable o un Promise
  alumnosAsincrono:any;

  constructor(public consolasService : ConsolasService) {
  this.alumnosAsincrono = new Promise( (resolve, reject) => {
    this.consolasService.getConsolas().subscribe(
      consolas => { console.log(consolas); resolve(consolas)
      } )
    })
  }

  ngOnInit() {
  }

}
