import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  isApiCalling: boolean = false;
  hide = true; // Initially, password is hidden
  form: FormGroup;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append("name", this.form.value.name);
      formData.append("email", this.form.value.email);
      formData.append("phone", this.form.value.phone);

      /** api calling to pass formData, but documention not mention contact submit api link */

      this._snackBar.open('Successfully data insert.', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.form.reset();
      window.location.href = 'https://techexactly.com/';
    } else {
      this._snackBar.open('Please fill out the form correctly.', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }

}
