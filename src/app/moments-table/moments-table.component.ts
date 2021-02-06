import { Component, AfterViewInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment'
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-moments-table',
  templateUrl: './moments-table.component.html',
  styleUrls: ['./moments-table.component.scss']
})
export class MomentsTableComponent implements AfterViewInit {
  @Input() momentsData: any[] = [];
  baseUrl = environment.apiBaseUrl;
  editMoment = false;
  moment: any;
  ngAfterViewInit() {
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
