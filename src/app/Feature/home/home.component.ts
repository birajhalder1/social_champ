import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModalComponent } from 'src/app/common-modal/common-modal.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

import { Store, select } from '@ngrx/store';
import { loadUsers } from '../../Core/store/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  arrPost: any = [];

  users$ = this.store.pipe(select(state => state.userState.users));
  loading$ = this.store.pipe(select(state => state.userState.loading));
  user_details: any = {};
  
  constructor(private store: Store<any>, private _service: ApiServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPost();
    this.user_details = {};
    setTimeout(() => {
      this.store.dispatch(loadUsers());
      // Subscribe to users$ to log the user data
      this.users$.subscribe(users => {
        this.user_details = users.body?.findUser;
        console.log("users", this.user_details);
      });
    }, 200);

    
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
