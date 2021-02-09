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
    this.breakpoint = (window.innerWidth <= 650) ? 1 : 2;
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 650) ? 1 : 2;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  validateInputs(userInfo: any) {
    if (!userInfo.firstname) { this.openSnackBar('Please enter first name.', ''); return false }
    if (!userInfo.lastname) { this.openSnackBar('Please enter last name.', ''); return false }
    if (!(userInfo.mobile && userInfo.mobile.toString().length == 10)) { this.openSnackBar('Please enter valid mobile no.', ''); return false }
    if (!(userInfo.email && this.validateEmail(userInfo.email))) { this.openSnackBar('Please enter a valid email id.', ''); return false }
    if (!userInfo.city) { this.openSnackBar('Please enter city.', ''); return false }
    if (!(userInfo.password && userInfo.password.length >= 6)) { this.openSnackBar('Please enter a valid password.', ''); return false } return true;
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
