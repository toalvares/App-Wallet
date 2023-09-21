import { Component } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  zapatillas = [
    {nombre: "Total 90", precio: 45000, descuento: 0, favoritas: false, estrellas: 4, imagen: "4.png"},
    {nombre: "AdiFom", precio: 50000, descuento: 20, favoritas: true, estrellas: 5, imagen: "5.png"},
    {nombre: "Jordan 1", precio: 150000, descuento: 6, favoritas: true, estrellas: 5, imagen: "7.png"},
    {nombre: "Air Max", precio: 95000, descuento: 30, favoritas: false, estrellas: 3, imagen: "8.png"}
  ]

  poneEstrellas(cantidad: number){
    let resultado = ""
    for(let i = 0 ; i < cantidad; i++ ){
      resultado += "⭐"
    }
    return resultado
  }

  agregar(zapatilla: any){
   if(localStorage.getItem("carro")== null){
    zapatilla.cantidad = 1
    localStorage.setItem("carro", JSON.stringify([zapatilla]))
   }else{
    let carro = JSON.parse(localStorage.getItem("carro")!)
    let encontrado = false
    for(let zap of carro){
      if(zap.nombre == zapatilla.nombre){
        zap.cantidad += 1
        encontrado = true
      }
    }
    if(!encontrado){
      zapatilla.cantidad = 1
      carro.push(zapatilla)
    }
    localStorage.setItem("carro", JSON.stringify(carro))
   }
  }

  getCantidadCarro(){
    let contador = 0
    for (let zapatilla of JSON.parse(localStorage.getItem("carro")!)){
      contador += zapatilla.cantidad
    }
  }


  constructor(
    private anim:AnimationController,
    private toast: ToastController
    ) {}


}
