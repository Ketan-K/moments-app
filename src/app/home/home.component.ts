import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  show = 'list';
  moments = [];
  constructor(private api: ApiService,
    private data: DataService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getMoments();
  }

  getScreenWidth() {
    return window.innerWidth;
  }

  getMoments() {
    this.spinner.show();
    this.api.getMoments().subscribe((result: any) => {
      this.spinner.hide();
      console.log(result);
      this.moments = result.data || [];
    }, (err) => {
      this.spinner.hide();
    })
  }

  logout() {
    this.spinner.show();
    this.data.eraseData()
    this.moments = [];
    this.spinner.hide();
  }

}
