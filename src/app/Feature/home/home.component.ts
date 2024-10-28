import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModalComponent } from 'src/app/common-modal/common-modal.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { io, Socket } from 'socket.io-client';
import { Store, select } from '@ngrx/store';
import { loadUsers } from '../../Core/store/user.actions';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

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

  users$ = this.store.pipe(select(state => state.userState.users));
  loading$ = this.store.pipe(select(state => state.userState.loading));
  user_details: any = {};
  homeSubscription: any = Subscription;
  constructor(private store: Store<any>, private _service: ApiServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

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
    console.log(this.arrPost[index]);
    
    this._service.socket_connection.subscribe((socketConnected: any) => {
      socketConnected.emit('join notification', {
        post_id: this.arrPost[index].id,
        user_id: localStorage.getItem('user_id'),
        reciever_id: this.arrPost[index].user_id.id
      });
    })
  }

  ngOnDestroy(){
    if(this.homeSubscription){
      this.homeSubscription.unsubscribe();
    }
  }
}
