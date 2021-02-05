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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  validateInputs(userInfo: any) {
    if (!userInfo.email) { this.openSnackBar('Please enter email id.', ''); return false }
    if (!userInfo.password) { this.openSnackBar('Please enter password.', ''); return false }
    return true;
  }
  login(userInfo: any) {
    if (!this.validateInputs(userInfo)) { return; };
    this.spinner.show();
    this.api.logIn(userInfo).subscribe((result: any) => {
      this.spinner.hide();
      this.openSnackBar(result.message, '')
      if (result.status) {
        console.log(result);
        this.data.saveUser(result.data);
        return this.router.navigateByUrl("/home");
      }
      return;
    }, (err) => {
      this.spinner.hide();
      this.openSnackBar(err.message || 'Internal server error', '')
    })
    console.log(userInfo);

  }
}
