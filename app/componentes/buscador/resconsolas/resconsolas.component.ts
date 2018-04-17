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

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['palabrasBusqueda']);
      this.palabrasBusqueda = params['palabrasBusqueda'];
      this.consolas = this.ConsolasService.buscarConsolas(this.palabrasBusqueda);
      console.log(this.consolas);
    })
  }

}
