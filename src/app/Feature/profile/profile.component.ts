import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loadUsers } from '../../Core/store/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users$ = this.store.pipe(select(state => state.userState.users));
  loading$ = this.store.pipe(select(state => state.userState.loading));
  user_details: any = {};
  selectedFile: File | null = null;
  accept = '.jpg, .jpeg, .png, .pdf'; // Specify the file types you want to accept

  display: FormControl = new FormControl("", Validators.required);
  profile_image: any = '';
  cover_image: any = '';
  file_list: Array<string> = [];

  constructor(private store: Store<any>,) { }

  ngOnInit(): void {
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file);
    }
  }

  handleFileInputChange(l: any): void {
    this.profile_image = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }

    console.log("this.profile_image", this.profile_image);
    
  }

  handleSubmit(): void {
    var fd = new FormData();
    fd.append("files", this.profile_image);
  }
}
