import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment'
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-moments-table',
  templateUrl: './moments-table.component.html',
  styleUrls: ['./moments-table.component.scss']
})
export class MomentsTableComponent implements OnInit {
  @Input() momentsData: any[] = [];
  baseUrl = environment.apiBaseUrl;
  editMoment = false;
  moment: any;
  pageSize = 10;
  totalCount = 100;
  pageIndex = 0;
  pageEvent: PageEvent | any;

  ngOnInit(): void {
    this.getMoments(0);
  }

  public handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getMoments(this.pageIndex);
  }

  getMoments(page: number) {
    this.spinner.show();
    this.api.getMoments(page, this.pageSize).subscribe((result: any) => {
      this.spinner.hide();
      console.log(result);
      this.totalCount = result.data.count;
      this.momentsData = result.data.result || [];
    }, (err) => {
      this.spinner.hide();
    })
  }

  getPage(e: any) {
    console.log(e)
  }

  constructor(private api: ApiService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
  ) { }

  edit(index: number) {
    this.editMoment = true;
    this.moment = this.momentsData[index];
    console.log(this.moment)
    console.log('edited', index);
  }

  editDone() {
    this.editMoment = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  delete(index: number) {
    this.spinner.show();
    this.api.deleteMoment(this.momentsData[index].momentID).subscribe((result: any) => {
      this.openSnackBar(result.message, '')
      if (result.status) {
        console.log(result);
        this.momentsData.splice(index, 1)
      }
      this.spinner.hide();
      return;
    }, (err) => {
      this.spinner.hide();
      this.openSnackBar(err.message || 'Internal server error', '')
    })
  }
}
