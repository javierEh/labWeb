import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ConsolasService, Consola } from '../../servicios/consolas.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

  formulario:FormGroup;

  constructor(public ConsolasService : ConsolasService) {
    this.formulario = new FormGroup({
      'nombre': new FormControl(''),
      'fichaTecnica': new FormControl(''),
      'imagen': new FormControl(''),
      'juegos': new FormArray([
        new FormGroup({
          '_id': new FormControl(''),
          'nombre': new FormControl(''),
          'portada': new FormControl(''),
          'developer': new FormControl(''),
          'lanzamiento': new FormControl(''),
          'img1': new FormControl(''),
          'img2': new FormControl(''),
          'img3': new FormControl(''),
          'liga1': new FormControl(''),
          'liga2': new FormControl(''),
          'liga3': new FormControl('')
        }),
        new FormGroup({
          '_id': new FormControl(''),
          'nombre': new FormControl(''),
          'portada': new FormControl(''),
          'developer': new FormControl(''),
          'lanzamiento': new FormControl(''),
          'img1': new FormControl(''),
          'img2': new FormControl(''),
          'img3': new FormControl(''),
          'liga1': new FormControl(''),
          'liga2': new FormControl(''),
          'liga3': new FormControl('')
        }),
        new FormGroup({
          '_id': new FormControl(''),
          'nombre': new FormControl(''),
          'portada': new FormControl(''),
          'developer': new FormControl(''),
          'lanzamiento': new FormControl(''),
          'img1': new FormControl(''),
          'img2': new FormControl(''),
          'img3': new FormControl(''),
          'liga1': new FormControl(''),
          'liga2': new FormControl(''),
          'liga3': new FormControl('')
        })
      ]),
    })
  }

  get juegos(): FormArray {
    return this.formulario.get('juegos') as FormArray;
  }



  ngOnInit() {
  }

  guardar(){
    console.log(this.formulario.value);

    new Promise( (resolve, reject) => { this.ConsolasService.addConsola(this.formulario.value).subscribe(
      consolas => {
        resolve()
      } )
    })
  }
}
