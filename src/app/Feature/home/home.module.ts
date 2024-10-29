import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/Core/material/material.module';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    HomeComponent,
    // DialogContentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
    MaterialModule
  ],
})
export class HomeModule { }
