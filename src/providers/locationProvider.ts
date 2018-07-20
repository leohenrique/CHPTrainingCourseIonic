import { Injectable, NgZone } from "@angular/core";
import { BackgroundGeolocation} from "ionic-native";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';


@Injectable()
export class LocationProvider {

  public latitude;
  public longitude;
  public watch;

  constructor(public zone: NgZone, 
    private geolocation: Geolocation,  
    private backgroundGeolocation: BackgroundGeolocation) {
 
  }

  startTracking() {
    this.trackBackground();
    this.trackForeground();
  }

  // Background Tracking
  trackBackground(){
        
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000,
      startOnBoot: true,
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    BackgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
      });

    }, (err) => {
      console.log(err);
    });

    // Turn ON the background-geolocation system.
    BackgroundGeolocation.start();

  }

  trackForeground(){
    // Foreground Tracking
    let options = {      
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined)
      .subscribe((position: Geoposition) => {
        console.log(position);

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
    
    });
    
    /*this.watch = this.geolocation.watchPosition(
      /// success callback
      function(position: Geoposition){
        console.log(position);

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      },
      /// error callback
      function(postion){
        console.log('Error to watch position.', postion);
      },
      /// options
      options
    );*/
  }
 
  stopTracking() {
 
    console.log('stopTracking'); 
    BackgroundGeolocation.finish();
    this.watch.unsubscribe();
 
  }

}
