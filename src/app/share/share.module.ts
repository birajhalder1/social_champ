import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../Feature/header/header.component';
import { FooterComponent } from '../Feature/footer/footer.component';
import { MaterialModule } from '../Core/material/material.module';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class ShareModule { }
