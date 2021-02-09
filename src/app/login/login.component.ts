import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

// import { UserInfo } from '../shared/interfaces/auth.interface';
// import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  title = 'Solutions';
  userInfo: any = {
    email: '',
    password: ''
  };
  hide = true
  constructor(
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private api: ApiService,
    private data: DataService,
    private router: Router) { }

  ngOnInit(): void {
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  validateInputs(userInfo: any) {
    if (!(userInfo.email && this.validateEmail(userInfo.email))) { this.openSnackBar('Please enter a valid email id.', ''); return false }
    if (!(userInfo.password && userInfo.password.length >= 6)) { this.openSnackBar('Please enter a valid password.', ''); return false }
    return true;
  }
  login(userInfo: any) {
    if (!this.validateInputs(userInfo)) { return; };
    this.spinner.show();
    this.api.logIn(userInfo).subscribe((result: any) => {
      this.openSnackBar(result.message, '')
      if (result.status) {
        console.log(result);
        this.data.saveUser(result.data);
        return this.router.navigateByUrl("/home");
      }
      this.spinner.hide();
      return;
    }, (err) => {
      this.spinner.hide();
      this.openSnackBar(err.message || 'Internal server error', '')
    })
    console.log(userInfo);

  }
}
