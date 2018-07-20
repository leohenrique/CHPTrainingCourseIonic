import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { ContatoService } from '../../services/ContatoService';
import { ContatoDetalhePage } from '../contato-detalhe/contato-detalhe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaContatos;

  constructor(public navCtrl: NavController,
              public contatoService: ContatoService,
              private _alertController: AlertController,
              private _toastController: ToastController
              ) {         
  }

  public selectContatos(){
    return this.listaContatos;    
  }

  public adicionar(){   
    this.navCtrl.push(ContatoDetalhePage);
  }

  public editar(pContato){
    this.navCtrl.push(ContatoDetalhePage, {'contato': pContato } );
  }

  public excluir(pContato){
    this._alertController.create({
      title: 'Confirmação',
      subTitle: 'Confirme a exclução.',
      message: 'Deseja realmente excluir?',
      buttons: [
        {text: 'Não', role: 'Cancel'},
        {text: 'Sim', handler: () => {
          this.contatoService.excluir(pContato).then(() => {
            this.contatoService.selectAll().then((value) => {

              this._toastController.create({
                message: 'Contato excluído com sucesso.',
                showCloseButton: true,
                position: 'bottom',
                duration: 2000
              }).present();
              return this.listaContatos = value;
            });
          });
        
        }}
      ]
    }).present();     
    
  }

  ionViewDidEnter() {
    this.contatoService.selectAll().then((value) => { 
      console.log(value);
      return this.listaContatos = value;
    });
  }

}
