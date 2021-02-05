import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.scss']
})
export class MomentsComponent implements OnInit {
  title = '';
  tags: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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

  constructor() { }

  ngOnInit(): void {
  }

}
