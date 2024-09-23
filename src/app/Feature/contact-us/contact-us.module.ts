import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ShareModule } from 'src/app/share/share.module';
import { MaterialModule } from 'src/app/Core/material/material.module';


@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    ShareModule,
    MaterialModule
  ]
})
export class ContactUsModule { }
