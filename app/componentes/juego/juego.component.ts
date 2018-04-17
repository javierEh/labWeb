import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsolasService, Consola } from '../../servicios/consolas.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  juego:any;
  idConsola:string;
  idJuego:string;

  constructor(private activatedRoute:ActivatedRoute,
              private consolasService:ConsolasService) {
    this.activatedRoute.params.subscribe(params => {


      console.log(params['idConsola']);
      console.log(params['idJuego']);

      this.idConsola = params['idConsola'];
      this.idJuego = params['idJuego'];

      this.juego = new Promise( (resolve, reject) => {
        this.consolasService.getJuego(this.idJuego).subscribe(
          juego => { console.log(juego); resolve(juego)
          } )
        })
      


    })
  }

  ngOnInit() {
  }

}
