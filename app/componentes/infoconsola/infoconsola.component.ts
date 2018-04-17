import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsolasService, Consola } from '../../servicios/consolas.service';

@Component({
  selector: 'app-infoconsola',
  templateUrl: './infoconsola.component.html',
  styleUrls: ['./infoconsola.component.css']
})
export class InfoconsolaComponent implements OnInit {

  consola:any = {};
  idConsola:string;

  constructor(private activatedRoute:ActivatedRoute,
              private consolasService:ConsolasService) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.idConsola = params['id'];
      this.consola = new Promise( (resolve, reject) => {
        this.consolasService.getConsola(this.idConsola).subscribe(
          consolas => { console.log(consolas); resolve(consolas)
          } )
        })
    })
  }

  ngOnInit() {
  }

}
