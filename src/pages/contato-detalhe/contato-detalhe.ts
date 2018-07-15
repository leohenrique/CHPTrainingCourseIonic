import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContatoService } from '../../services/ContatoService';
import { Contato } from '../../model/Contato';

/**
 * Generated class for the ContatoDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contato-detalhe',
  templateUrl: 'contato-detalhe.html',
})
export class ContatoDetalhePage {

  public contato;
  public crudMode = 'insert';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public contatoService: ContatoService) {

    this.contato = this.navParams.get('contato');
    if (this.contato){
      this.crudMode = 'edit';
    } else {
      this.contato = new Contato();
    }
  }

  salvar(){
    if (this.contato){
      if (this.crudMode === 'insert'){
        this.contatoService.adicionar(this.contato);
      } else if (this.crudMode === 'edit'){
        this.contatoService.editar(this.contato);
      }

    }
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoDetalhePage');
  }

}
