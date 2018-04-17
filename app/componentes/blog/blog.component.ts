import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  formulario:FormGroup;
  entradas:any[];

  constructor() {
    this.entradas = [];
    this.formulario = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'entrada': new FormControl('', [Validators.required, Validators.minLength(30)]),
    })
  }

  ngOnInit() {
  }

  guardar(){

    let nuevaEntrada={} as Entrada;
    nuevaEntrada.nombre = this.formulario.value.nombre;
    nuevaEntrada.entrada = this.formulario.value.entrada;
    nuevaEntrada.fecha = new Date();
    this.entradas.push(nuevaEntrada);
    console.log(this.formulario.value);
  }

}

export interface Entrada{
  nombre:string;
  entrada:string;
  fecha:Date;
}
