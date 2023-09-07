import { Component } from '@angular/core';
import { AnimationController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private nav:NavController,
    private anim:AnimationController) {}
  
  animaTransaccion(index:number){
    this.anim.create().addElement(document.querySelectorAll(".transaccion")[index]!)
    .duration(200).iterations(2).keyframes([
      {offset: 0, "transform": 'translateX(-3px)'},
      {offset: .5, "transform": 'translateX(3px)'},
      {offset: 1, "transform": 'translateX(0px)'},
    ])
    .onFinish(()=>this.irWallet())
    .play()
  }

  irWallet(){
    this.nav.navigateForward('wallet');
  }

}
