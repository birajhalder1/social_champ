import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MustMatch } from './confirmed.validator';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Router } from '@angular/router';
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isApiCalling: boolean = false;
  password_hide = true; // Initially, password is hidden
  confirm_password_hide = true; // Initially, password is hidden
  form: FormGroup;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private service: ApiServiceService, private router: Router) {
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, { 
      validator: MustMatch('password', 'confirm_password')
    });
  }
  ngOnInit(): void {
  }

  togglePasswordVisibility(type: string): void {
    if(type == 'password'){
      this.password_hide = !this.password_hide;
    }else{
      this.confirm_password_hide = !this.confirm_password_hide;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append("first_name", this.form.value.first_name);
      formData.append("last_name", this.form.value.last_name);
      formData.append("email", this.form.value.email);
      formData.append("mobile", this.form.value.mobile);
      formData.append("password", this.form.value.password);

      this.isApiCalling = true;
      this.service.registration(formData).subscribe((res: any) => {
        this.service.successAlert(res.message);
        if(res.status == 200){
          this.router.navigate(['/login']);
        }
        this.isApiCalling = false;
      }, (err) => {
        this.isApiCalling = false;
        this.service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
      })
      
      
    } else {
      this._snackBar.open('Please fill out the form correctly.', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }

}

