import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userInfo: any = {
    firstname: '',
    lastname: '',
    mobile: '',
    email: '',
    city: '',
    password: ''
  };
  hide = true;
  breakpoint = 0;
  constructor(
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  validateInputs(userInfo: any) {
    if (!userInfo.firstname) { this.openSnackBar('Please enter first name.', ''); return false }
    if (!userInfo.lastname) { this.openSnackBar('Please enter last name.', ''); return false }
    if (!userInfo.mobile) { this.openSnackBar('Please enter mobile no.', ''); return false }
    if (!userInfo.email) { this.openSnackBar('Please enter email id.', ''); return false }
    if (!userInfo.city) { this.openSnackBar('Please enter city.', ''); return false }
    if (!userInfo.password) { this.openSnackBar('Please enter password.', ''); return false }
    return true;
  }

  signUp(userInfo: any) {
    if (!this.validateInputs(userInfo)) { return; };
    this.spinner.show();
    this.api.signUp(userInfo).subscribe((result: any) => {
      this.spinner.hide();
      this.openSnackBar(result.message, '')
      if (result.status) {
        this.router.navigateByUrl("/login");
      }
      console.log(result);
    }, (err) => {
      this.spinner.hide();
      this.openSnackBar(err.message || 'Internal server error', '')
    })
    console.log(userInfo)
  }
}
