import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';

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
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMoments();
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

}
