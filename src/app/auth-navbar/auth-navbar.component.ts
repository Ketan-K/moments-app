import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss']
})
export class AuthNavbarComponent implements OnInit {
  title = 'Solutions';

  constructor(private _location: Location) { }
  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }
}
