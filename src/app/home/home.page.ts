import { Component } from '@angular/core';
import { AnimationController, Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  usuarios : any = []

  constructor(
    private sqlite: SQLite,
    private platform: Platform
    ) {}

    ngOnInit(){
      this.platform.ready().then(() => { 
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql('select * from usuario', [])
            .then((datos) => {
              for(let i=0; i<datos.rows.length; i++){
                this.usuarios.push({
                  user: datos.rows.item(i).usuarios,
                  clave: datos.rows.item(i).usuarios
                })
              }
            })
            .catch(e => console.log(e));
          })
        })
    }

    llenaTabla(){
      this.conexion.executeSql('delete from usuario where usuari=?', [])
    }

}
