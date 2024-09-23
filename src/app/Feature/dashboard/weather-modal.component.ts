import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html'
})
export class WeatherModalComponent implements OnInit {
  weatherData: any = {};  // Store the weather data
  weatherSubscription: any = Subscription;
  constructor(public dialogRef: MatDialogRef<WeatherModalComponent>, private service: ApiServiceService) {}

  ngOnInit(): void {
    this.weatherSubscription = this.service.weatherDetails.subscribe((res: object) => {
      if (res) {
        this.weatherData = res;  // Assign the data to a variable
        console.log("Modal received data:", this.weatherData);
      }
      
    })
  }

  onConfirm(): void {
    // Perform any action on confirm
    this.dialogRef.close(true);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
