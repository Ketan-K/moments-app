import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }
  file: any;

  imageUrl: string = '';

  onFileDropped($event: any) {
    this.prepareFilesList($event);
    $event = []
  }


  fileBrowseHandler(event: any) {
    this.prepareFilesList(event.files);
    event.files = [];
  }


  deleteFile() {
    let image = this.imageUrl
    this.file = null;
    this.imageUrl = ''
    this.api.deleteFile(image).subscribe();
  }


  uploadFiles() {
    this.api.uploadFile(this.file).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.file.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(event.body)
          this.imageUrl = event.body.data
        }
      },
      err => {
        this.file.progress = 0;
      });
  }



  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.file = item;
    }
    this.uploadFiles();
  }


  formatBytes(bytes: number, decimals = 1) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
