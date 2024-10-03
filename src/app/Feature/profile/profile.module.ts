import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ShareModule } from 'src/app/share/share.module';
import { MaterialModule } from 'src/app/Core/material/material.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ShareModule,
    MaterialModule
  ]
})
export class ProfileModule { }
