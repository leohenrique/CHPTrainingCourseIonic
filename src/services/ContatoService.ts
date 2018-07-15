import { Contato } from "../model/Contato"; 

import { Injectable } from "../../node_modules/@angular/core";
import { ContatoDAO } from "../model/ContatoDAO";

@Injectable()
export class ContatoService{

  private _contatoList = [];

  constructor(public contatoDAO: ContatoDAO){
  }

  private returnAutoInc(){
    if (this._contatoList && this._contatoList.length > 0){
      return this._contatoList[this._contatoList.length-1].id + 1;
    } else {
      return 1;
    }
  }

  public selectAll(){
    return this.contatoDAO.select()
      .then((lista) => { 
        lista.sort((a,b) => {
          return a.id < b.id ? -1 : 1;
        });
        this._contatoList = lista;
        return lista;
      });
  }

  public adicionar(pContato: Contato){
    pContato.id = this.returnAutoInc();    
    this._contatoList.push(pContato);
    this.contatoDAO.insert(pContato);
  }

  public editar(pContato: Contato){
    this.contatoDAO.edit(pContato);
    this._contatoList.forEach(item => {
      if (item.id === pContato.id){
        item = pContato;
      }
    });
  }

  public excluir(pContato: Contato){
    return this.contatoDAO.delete(pContato).then(() =>{
      
      this._contatoList = this._contatoList.filter(item => {
        return item.id !== pContato.id;
      });
    })
    
  }

}