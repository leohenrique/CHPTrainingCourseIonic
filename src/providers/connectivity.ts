import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular/platform/platform';


/*var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';
*/
  
declare var Connection;

@Injectable()
export class ConnectivityProvider {

  onDevice: boolean;

  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');

    console.log('Network status : ', Network.type);

    Network.onchange().subscribe((data:any) => {
      console.log('Network status changed: ', data);
    });

  }

  isOnline(): boolean {

    if(this.onDevice ){
      console.log('online: '+ Network.type !== Connection.NONE);
      return Network.type !== Connection.NONE;
    } else {
      console.log('online: '+ navigator.onLine);
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice){
      return Network.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }

  start(){

  }
}
