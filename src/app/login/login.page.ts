import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
            //Lo ideal sería guardar esta instancia de SQLiteObject en una variables estática para utilizarla desde un servicio con un patrón singleton.
            db.executeSql('create table usuario(usuario VARCHAR(32) PRIMARY KEY, clave varchar(15) not null)', [])
              .then(() => console.log('Executed SQL tabla usuario creada'))
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
        })

    }

    login(){
      this.conexion.executeSql('select * from usuario where usuario = ? and clave = ?', [this.user, this.clave])
      .then((resultado:any) => {
        if(resultado.rows.length > 0){
          this.alerta("Bienvenido "+ this.user, () => this.nav.navigateForward('/home'))
          
        }else{
          this.alerta("Usuario o Contraseña no existen", async () => console.log(""))
        }
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
