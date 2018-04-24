import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsolasService } from "../../servicios/consolas.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  formulario:FormGroup;
  entradas:any[];

  constructor(public consolasService : ConsolasService) {
    this.entradas = [];
    this.formulario = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'entrada': new FormControl('', [Validators.required, Validators.minLength(30)]),
    })
  }

  ngOnInit() {
  }

guardar(){
  console.log(this.formulario.value);
  new Promise( (resolve, reject) => {
  this.consolasService.addEntry(this.formulario.value).subscribe( consolas => {
  resolve() } ) }) }
}

export interface Entrada{
  nombre:string;
  entrada:string;
  fecha:Date;
}
