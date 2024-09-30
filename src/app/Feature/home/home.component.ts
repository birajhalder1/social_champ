import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModalComponent } from 'src/app/common-modal/common-modal.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  arrPost: any = [];
  constructor(private _service: ApiServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(){
    this.arrPost = [];
    this._service.allPost().subscribe((res: any) => {
      if(res.status == 200){
        this.arrPost = res.body.data;
        // this.arrPost = [
        //   {
        //     user: 'BIRAJ HALDER',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },
        //   {
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },{
        //     user: 'John Doe',
        //     timestamp: new Date(),
        //     description: 'This is a sample post description for John Doe.',
        //     image: '' // Optional image
        //   },
        //   {
        //     user: 'SUBHAMAY PARIA',
        //     timestamp: new Date(),
        //     description: 'Another post without an image.',
        //     image: '' // No image
        //   }
        // ];
      }
    }, (err: any) => {
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
  openAddModal(){
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '500px',
      disableClose: true,  // Disable closing the modal on backdrop click and escape key
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result:', result);  // You can handle the result here
    });
  }
}
