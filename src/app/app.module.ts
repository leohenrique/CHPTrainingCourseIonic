import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ContatoService } from '../services/ContatoService';
import { ContatoDetalhePage } from '../pages/contato-detalhe/contato-detalhe';
import { Storage } from "@ionic/storage";
import { ContatoDAO } from '../model/ContatoDAO';
import { ApplicationService } from '../services/applicationService';
import { HttpModule } from '@angular/http';
import { ConnectivityProvider } from '../providers/connectivity';

export function provideStorage(){
  return new Storage({
      driverOrder: ['websql'],
      name: 'store_contatos',
      storeName: 'store_contatos'
    }
  );
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContatoDetalhePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContatoDetalhePage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage},
    ContatoService,
    ContatoDAO,
    ApplicationService,
    ConnectivityProvider
    
  ]
})
export class AppModule {}
