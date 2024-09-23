import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isApiCalling: boolean = false;
  hide = true; // Initially, password is hidden
  form: FormGroup;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private service: ApiServiceService, private router: Router) {
    this.form = this.fb.group({
      isRemember: [false],
      // email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    if(localStorage.getItem('isRemember')){
      let data = JSON.parse(localStorage.getItem('isRemember') || '');
      this.form.get('isRemember')?.setValue(data.isRemember);
      this.form.get('mobile')?.setValue(data.mobile);
      this.form.get('password')?.setValue(data.password);
    }else{
      this.form.get('isRemember')?.setValue(false);
      this.form.get('mobile')?.setValue('');
      this.form.get('password')?.setValue('');
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide; // Toggle between true and false
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: any = {};
      formData["mobile"] = this.form.value.mobile
      formData["password"] = this.form.value.password



      this.isApiCalling = true;
      this.service.login(formData).subscribe((res: any) => {
        this.service.successAlert(res.message ? res.message : "Something went wrong, please try again latter.");
        this.isApiCalling = false;
        if(res.status == 200){
          localStorage.setItem('currentUser', JSON.stringify(this.form.value));
          if(this.form.value.isRemember){
            localStorage.setItem('isRemember', JSON.stringify(this.form.value));
          }else{
            localStorage.removeItem('isRemember');
          }
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/dashboard']);
        }
      }, (err) => {
        this.isApiCalling = false;
        this._snackBar.open(err.error.message ? err.error.message : 'Something went wrong, please try again latter.', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
      
      
    } else {
      this._snackBar.open('Please fill out the form correctly.', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }

  async loginSubmit(): Promise<string> {
   return this.service.signIn().then((idToken: string) => {
      return idToken
    })
  }

  async login(){
      let accessToken = await this.loginSubmit();
      
      // Send this token to the backend for verification
      this.service.api_google_auth({ accessToken }).subscribe((response: any) => {
        this.service.successAlert(response.message);
        if(response.status == 200){
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('data', JSON.stringify(response));
          this.router.navigate(['/home']);
        }
      }, (err) => {
        this.service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
      })
  }
}
