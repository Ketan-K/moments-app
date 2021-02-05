import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.scss']
})
export class MomentsComponent implements OnInit {
  tags: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  moment = {
    title: '',
    tags: this.tags,
    imageUrl: ''
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.tags.push(value)
    input.value = ''
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  constructor(private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private api: ApiService,
    private router: Router) { }


  ngOnInit(): void {
  }

  imagePath(path: string) {
    this.moment.imageUrl = path;
    console.log(this.moment)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  validateInputs(moment: any) {
    if (!moment.title) { this.openSnackBar('Please enter title.', ''); return false }
    if (!moment.imageUrl) { this.openSnackBar('Please upload image.', ''); return false }
    return true;
  }

  addMoment() {
    if (!this.validateInputs(this.moment)) { return; };
    this.spinner.show();
    this.api.addMoment(this.moment).subscribe((result: any) => {
      this.spinner.hide();
      this.openSnackBar(result.message, '')
      if (result.status) {
        console.log(result);
        return this.router.navigateByUrl("/home");
      }
      return;
    }, (err: any) => {
      this.spinner.hide();
      this.openSnackBar(err.message || 'Internal server error', '')
    })
  }
}
