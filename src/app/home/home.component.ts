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
  moments = <any>[];
  constructor(private api: ApiService,
    private data: DataService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
  }

  getScreenWidth() {
    return window.innerWidth;
  }

  onAdded(moment: any) {
    console.log(moment);
    this.moments.push(moment);
    this.show = 'list';
  }
  logout() {
    this.spinner.show();
    this.data.eraseData()
    this.moments = [];
    this.spinner.hide();
  }

}
