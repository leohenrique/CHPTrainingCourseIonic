import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContatoService } from '../../services/ContatoService';
import { ContatoDetalhePage } from '../contato-detalhe/contato-detalhe';
import { ApplicationService } from '../../services/applicationService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaContatos;

  constructor(public navCtrl: NavController,
              public contatoService: ContatoService
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
    this.contatoService.excluir(pContato).then(() => {
      this.contatoService.selectAll().then((value) => { 
        console.log(value);
        return this.listaContatos = value;
      });
    });
    
    
  }

  ionViewDidEnter() {
    this.contatoService.selectAll().then((value) => { 
      console.log(value);
      return this.listaContatos = value;
    });
  }

}
