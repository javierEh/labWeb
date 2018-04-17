import { Component, OnInit } from '@angular/core';
import { ConsolasService, Consola } from '../../servicios/consolas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juegosconsola',
  templateUrl: './juegosconsola.component.html',
  styleUrls: ['./juegosconsola.component.css']
})
export class JuegosconsolaComponent implements OnInit {

  juegos:any = [];
  idConsola:string;



  constructor( private consolasService:ConsolasService,
               private activatedRoute:ActivatedRoute) {
     this.activatedRoute.params.subscribe(params => {
       console.log(params['id']);
       this.idConsola = params['id'];
     })
  }

  ngOnInit() {
    new Promise( (resolve, reject) => {
      this.consolasService.getJuegoConsola(this.idConsola).subscribe(
        juegos => { this.juegos = juegos[0].juegos; console.log(this.juegos); resolve(juegos)
        } )
      })



  }

}
