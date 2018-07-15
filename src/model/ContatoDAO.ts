import { Injectable } from "../../node_modules/@angular/core";
import { Storage } from "@ionic/storage"

@Injectable()
export class ContatoDAO {

  constructor(public storage: Storage){    
  }

  insert(pContato){
    this.storage.set(pContato.id, pContato);
  }
  
  edit(pContato){
    this.storage.set(pContato.id, pContato);
  }
  
  delete(pContato){
    return this.storage.remove(pContato.id);
  }

  select(pContato?){
    if(pContato){
      return this.storage.get(pContato.id);
    } else {
      var lista = [];
      return this.storage.forEach((item,key,i)=>{
        lista.push(item);
        console.log('foreach', item);
      }).then(value => {
        console.log(lista);
        return lista;
      })
    }
    
  }
}