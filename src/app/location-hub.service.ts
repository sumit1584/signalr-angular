import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { CONFIGURATION } from './_models/app.constants';
import { Coordinates } from './_models/Coordinates';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

 

@Injectable({
  providedIn: 'root'
})
export class LocationHubService {
private connection : signalR.HubConnection;
connectionEstablished = new Subject<Boolean>();
locationCordinates = new Subject<string>();
constructor(private httpClient: HttpClient) { }
generate(){
  this.httpClient.get(CONFIGURATION.baseUrls.server+'WeatherForecast').subscribe((res) => {
    console.log(res);
  });
}
connect(){
  if(!this.connection){
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl(CONFIGURATION.baseUrls.server+'location').build();
  }

  this.connection.start().then(() => {
    console.log('Hub connection started');
    this.connectionEstablished.next(true);
  }).catch(err => console.log(err));

  this.connection.on('GetLocation', (status:string) => {
    console.log('Received',status);
    this.locationCordinates.next(status);
  });

}

disconnect() {
  if (this.connection) {
    this.connection.stop();
    this.connection = null;
  }
}
 
}
