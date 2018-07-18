import { Injectable } from "../../node_modules/@angular/core";
import { Http, Headers } from "@angular/http";

@Injectable()
export class ApplicationService {

  private _URI = "http://localhost:3000";

  constructor(private _http: Http){

  }

  public httpGET(pPath){

    let aHeaders = new Headers();
    aHeaders.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this._http.get(this._URI + pPath, {headers: aHeaders})    
        .subscribe((value)  => {        
        
          resolve(value.json());
        });
    });
     
  }

  public httpPOST(pPath, pBody){

    let aHeaders = new Headers();
    aHeaders.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this._http.post(this._URI + pPath, pBody, {headers: aHeaders})    
        .subscribe((value)  => {        
        
          resolve(value.json());
        });
    });
     
  }

  public httpPUT(pPath, pBody){
    
    let aHeaders = new Headers();
    aHeaders.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this._http.put(this._URI + pPath, pBody, {headers: aHeaders})    
        .subscribe((value)  => {        
        
          resolve(value.json());
        });
    });
    
  }

  public httpDELETE(pPath){

    let aHeaders = new Headers();
    aHeaders.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this._http.delete(this._URI + pPath, {headers: aHeaders})    
        .subscribe((value)  => {        
        
          resolve(value.json());
        });
    });
     
  }
}