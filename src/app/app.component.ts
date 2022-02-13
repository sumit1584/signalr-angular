import { AfterViewInit, Component } from '@angular/core';
import { LocationHubService } from './location-hub.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
 status:string ='processing...';
  locationSubscription: any;

  constructor(private location:LocationHubService){

  }
  generate(){
    this.status='processing...';
    this.location.generate();
  }
  
  ngAfterViewInit() {
    this.location.connect();
    this.locationSubscription = this.location.locationCordinates.subscribe(status => {
      this.status = status.toString();
    });
    
  }
  title = 'signalr-angular';


}
