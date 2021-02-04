import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

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
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  signUp(userInfo: any) {
    this.spinner.show();
    console.log(userInfo)
    this.spinner.hide();
  }
}
