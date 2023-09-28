import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user = ""
  clave = ""
  conexion : any

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alert: AlertController,
    private nav: NavController,
    ) {}

    ngOnInit(){
      this.platform.ready().then(() => { 
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            this.conexion = db
          })
          .catch(e => console.log(e));
        });
    }

    registrar(){
      this.conexion.executeSql('insert into usuario values(?, ?)', [this.user, this.clave])
      .then(() => {
          this.alerta("Usuario creado "+ this.user, () => this.nav.navigateForward('/login'))          
        })
        .catch((e: any) => console.log(e));
      }
      


    async alerta(texto: string, action: ()=>{} ) {
      const alert = await this.alert.create({
        header: 'Alert',
        subHeader: 'Important message',
        message: texto,
        buttons: [
          {
          text: 'Ok',
          handler: action  
          }
          ],
      });
  
      await alert.present();
    }
}
