import { Contato } from "../model/Contato"; 

import { Injectable } from "@angular/core";
import { ContatoDAO } from "../model/ContatoDAO";
import { ApplicationService } from "./applicationService";

@Injectable()
export class ContatoService{

  private _contatoList = [];
  private _syncReady = false;

  constructor(public contatoDAO: ContatoDAO,
              private _applicationService: ApplicationService){

    
  }

  private returnAutoInc(){
    if (this._contatoList && this._contatoList.length > 0){
      return this._contatoList[this._contatoList.length-1].id + 1;
    } else {
      return 1;
    }
  }

  public selectAll(){
    return this.syncGet().then(() =>{
      return this.contatoDAO.select()
        .then((lista) => { 
          lista.sort((a,b) => {
            return a.id < b.id ? -1 : 1;
          });
          this._contatoList = lista;
          return lista;
        });
    });
    
  }

  public adicionar(pContato: Contato){
    pContato.id = this.returnAutoInc();
    this._applicationService.httpPOST('/contatos', pContato).then(() =>{
      
      this._contatoList.push(pContato);
      this.contatoDAO.insert(pContato);

    });
    
    
  }

  public editar(pContato: Contato){
    this._applicationService.httpPUT('/contatos/'+pContato.id, pContato).then(() => {
      this.contatoDAO.edit(pContato);
      this._contatoList.forEach(item => {
        if (item.id === pContato.id){
          item = pContato;
        }
      });
    });
    
  }

  public excluir(pContato: Contato){
    return this._applicationService.httpDELETE('/contatos/'+pContato.id).then(() => {
      return this.contatoDAO.delete(pContato).then(() =>{
      
        this._contatoList = this._contatoList.filter(item => {
          return item.id !== pContato.id;
        });
      });
    });
    
    
  }

  public syncGet(){    

    return this._applicationService.httpGET('/contatos').then((listaContatos:any) => {
      return this.contatoDAO.deleteAll().then(() => {
        listaContatos.forEach(contato => {
          this.contatoDAO.insert(contato);
        });
        console.log('Finish Sync');
      })
    })
  }
}