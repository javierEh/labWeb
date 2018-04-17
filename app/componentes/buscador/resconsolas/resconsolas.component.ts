import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsolasService } from '../../../servicios/consolas.service';

@Component({
  selector: 'app-resconsolas',
  templateUrl: './resconsolas.component.html',
  styleUrls: ['./resconsolas.component.css']
})

export class ResconsolasComponent implements OnInit {
  consolas:any[] = []; palabrasBusqueda:string;

  constructor(private activatedRoute:ActivatedRoute, private ConsolasService:ConsolasService) { }

  alumnosAsincrono:any;



  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['palabrasBusqueda']);
      this.palabrasBusqueda = params['palabrasBusqueda'];

      this.alumnosAsincrono = new Promise( (resolve, reject) => {
        this.ConsolasService.getConsolasWithName(this.palabrasBusqueda).subscribe(
          consolas => { console.log(consolas); resolve(consolas)
          } )
        })

      console.log(this.consolas);
    })
  }

}
