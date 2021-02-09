import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.scss']
})
export class MomentsComponent implements OnInit {
  @Output() done = new EventEmitter<any>()
  baseUrl = environment.apiBaseUrl;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags: string[] = []
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() moment = {
    momentID: null,
    title: '',
    tags: this.tags,
    imageUrl: '',
    file: null
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.moment.tags.push(value)
    input.value = ''
  }

  remove(tag: any): void {
    const index = this.moment.tags.indexOf(tag);
    if (index >= 0) {
      this.moment.tags.splice(index, 1);
    }
  }

  constructor(private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private api: ApiService) { }


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
    let updateOrAdd = this.moment.momentID ? this.api.updateMoment(this.moment) : this.api.addMoment(this.moment);
    updateOrAdd.subscribe((result: any) => {
      this.spinner.hide();
      this.openSnackBar(result.message, '')
      if (result.status) {
        console.log(result);
        this.moment = {
          momentID: null,
          title: '',
          tags: [],
          imageUrl: '',
          file: null
        }
        this.done.emit(result.data);
      }
      return;
    }, (err: any) => {
      this.spinner.hide();
      this.openSnackBar(err.message || 'Internal server error', '')
    })
  }
}
