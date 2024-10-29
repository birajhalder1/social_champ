import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModalComponent } from 'src/app/common-modal/common-modal.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { io, Socket } from 'socket.io-client';
import { Store, select } from '@ngrx/store';
import { loadUsers } from '../../Core/store/user.actions';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  socket!: Socket;
  arrPost: any = [];
  arrRecommendation: any = [];
  arrRequestFollowers: any = [];
  isMobile: boolean = false;
  users$ = this.store.pipe(select(state => state.userState.users));
  loading$ = this.store.pipe(select(state => state.userState.loading));
  user_details: any = {};
  post_index: number = 0;
  homeSubscription: any = Subscription;
  constructor(private breakpointObserver: BreakpointObserver, private store: Store<any>, private _service: ApiServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { 
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      console.log("this.isMobile", this.isMobile);
      
    });

    const pixelRatio = window.devicePixelRatio;
const fullWidth = window.screen.width * pixelRatio;
const fullHeight = window.screen.height * pixelRatio;
console.log(`Full Device Resolution: ${fullWidth}x${fullHeight}`);

  }

  ngOnInit(): void {
    this.socket?.off('join socket');
    this.socket?.off('connect chat');
    this.socket?.disconnect();

    this.getAllPost();
    this.getAllRecommendationList();
    this.getAllRequestFollowerList();
    this.user_details = {};
    setTimeout(() => {
      this.store.dispatch(loadUsers());
      // Subscribe to users$ to log the user data
      this.users$.subscribe(users => {
        this.user_details = users.body?.findUser;
        console.log("users", this.user_details);
      });
    }, 200);

    this.homeSubscription = this._service.isCreatePost.subscribe((res: boolean) => {
      if(res){
        this.getAllPost();
      }
    })
  }

  getAllRecommendationList() {
    this.arrRecommendation = [];
    this._service.allUsers({ type: 'recommendation' }).subscribe((res: any) => {
      if (res.status == 200) {
        this.arrRecommendation = res.body;
      }
    }, (err: any) => {
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
  getAllRequestFollowerList() {
    this.arrRequestFollowers = [];
    this._service.allFollower({ type: 'false' }).subscribe((res: any) => {
      if (res.status == 200) {
        this.arrRequestFollowers = res.body;
        console.log(this.arrRequestFollowers);

      }
    }, (err: any) => {
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
  followback(index: number) {
    this.arrRequestFollowers[index].isSubmitFollowing = true;
    let data = { "isFollowBack": true }

    this._service.updateFollower(data, this.arrRequestFollowers[index].id).subscribe((res: any) => {
      this.arrRequestFollowers[index].isSubmitFollowing = false;
      if (res.status == 200) {
        this.arrRequestFollowers.splice(index, 1);
      }
    }, (err: any) => {
      this.arrRequestFollowers[index].isSubmitFollowing = false;
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
  getAllPost() {
    this.arrPost = [];
    this._service.allPost().subscribe((res: any) => {
      if (res.status == 200) {
        this.arrPost = res.body.data;
      }
    }, (err: any) => {
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
  openAddModal() {
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '500px',
      disableClose: true,  // Disable closing the modal on backdrop click and escape key
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result:', result);  // You can handle the result here
    });
  }

  onClickLike(index: number) {
    this._service.socket_connection.subscribe((socketConnected: any) => {
      socketConnected.emit('join notification', {
        post_id: this.arrPost[index].id,
        user_id: localStorage.getItem('user_id'),
        reciever_id: this.arrPost[index].user_id.id,
        notification_type: 'like'
      });
    })
  }

  onEdit() {
    console.log("Edit clicked");
  }

  onDelete(index: number) {
    this.post_index = index;
    // this.dialog.open(DialogContentComponent, {
    //   width: '300px', // Set the desired width
    //   disableClose: true,
    // });

    // this._service.isDeletePost.subscribe((response: boolean)=>{
    //   if(response){
    //     this.arrPost.splice(this.post_index, 1);
    //   }
    // })
  }
  ngOnDestroy(){
    if(this.homeSubscription){
      this.homeSubscription.unsubscribe();
    }
  }
}

// Define the dialog content inline in the same file
// @Component({
//   selector: 'app-dialog-content',
//   template: `
//     <mat-dialog-content>
//       <p>Are you sure want to remove this post ?</p>
//     </mat-dialog-content>
//     <mat-dialog-actions align="end">
//       <button mat-button mat-dialog-close>Close</button>
//       <button mat-button (click)="deletePost()">Submit</button>
//     </mat-dialog-actions>
//   `,
// })
// export class DialogContentComponent {
  
//   constructor(private _service: ApiServiceService,public dialogRef: MatDialogRef<DialogContentComponent>) {}

//   deletePost(){
//     this._service.isDeletePost.next(true);
//   }
// }
