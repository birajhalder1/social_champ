import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { environment } from 'src/environments/environment';
import { WeatherModalComponent } from './weather-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  current_weather: any = {};
  constructor(private service: ApiServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    let api_key = environment.weather_api_key;
    let location_value = 'Kolkata';
    this.service.fetchWeather({location_value, api_key}).subscribe((res: any) => {
      this.current_weather = res;
    }, (err)=> {
      this._snackBar.open(err.error.message ? err.error.message : 'Something went wrong, please try again latter.', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })
  }

  openModal(): void {
    this.service.weatherModalData(this.current_weather);
    const dialogRef = this.dialog.open(WeatherModalComponent, {
      width: '250px',
      disableClose: true,  // Disable closing the modal on backdrop click and escape key
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result:', result);  // You can handle the result here
    });
  }

}
