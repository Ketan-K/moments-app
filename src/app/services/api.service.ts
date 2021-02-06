import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  makePostReq(path: string, data: any) {
    return this.http.post(`${this.apiUrl}${path}`, data)
  }

  makeGetReq(path: string) {
    return this.http.get(`${this.apiUrl}${path}`)
  }

  makeDeleteReq(path: string) {
    return this.http.delete(`${this.apiUrl}${path}`)
  }

  signUp(userInfo: any) {
    return this.makePostReq('/user/register', userInfo);
  }

  logIn(userInfo: any) {
    return this.makePostReq('/user/login', userInfo);
  }

  addMoment(moment: any) {
    return this.makePostReq('/moments', moment);
  }

  getMoments() {
    return this.makeGetReq('/moments');
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.apiUrl}/image`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  deleteFile(filepath: any) {
    return this.makeDeleteReq(`/image/${filepath}`);
  }

  deleteMoment(momentID: any) {
    return this.makeDeleteReq(`/moments/${momentID}`);
  }

}
