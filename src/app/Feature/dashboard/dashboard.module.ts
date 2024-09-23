import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from 'src/app/share/share.module';
import { MaterialModule } from 'src/app/Core/material/material.module';
import { WeatherModalComponent } from './weather-modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WeatherModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    MaterialModule
  ],
  exports: [ShareModule],
})
export class DashboardModule { }
