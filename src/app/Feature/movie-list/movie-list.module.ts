import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';
import { ShareModule } from 'src/app/share/share.module';
import { MaterialModule } from 'src/app/Core/material/material.module';


@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    CommonModule,
    MovieListRoutingModule,
    ShareModule,
    MaterialModule
  ]
})
export class MovieListModule { }
