import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { environment } from 'src/environments/environment';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  title: string;
  overview: string;
  release_date: string;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movieData: PeriodicElement[]= [];
  constructor(private service: ApiServiceService, private _snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['title', 'overview', 'release_date'];
  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    this.movieData = [];
    this.service.fetchMovie(environment.movie_api_key).subscribe((res: any) => {
      this.movieData = res.results;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.movieData);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 100);
    }, (err)=> {
      this._snackBar.open(err.error.message ? err.error.message : 'Something went wrong, please try again latter.', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })
  }


}
