import { Component, AfterViewInit, Input } from '@angular/core';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-moments-table',
  templateUrl: './moments-table.component.html',
  styleUrls: ['./moments-table.component.scss']
})
export class MomentsTableComponent implements AfterViewInit {
  @Input() momentsData: any[] = [];
  baseUrl = environment.apiBaseUrl;
  ngAfterViewInit() {
  }
  constructor() { }



}
