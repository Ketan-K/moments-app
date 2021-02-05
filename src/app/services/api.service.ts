import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router, private data: DataService) { }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.router.navigateByUrl("/login");
    }
    return throwError(error.message || 'Internal Server Error')

  }
  setHeaders() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let user = this.data.getUser();
    if (user.authToken) {
      headers = headers.append('authToken', user.authToken);
    }
    console.log('Userrrrr', user, headers)
    return headers;
  }

  makePostReq(path: string, data: any) {
    return this.http.post(`${this.apiUrl}${path}`, data, { headers: this.setHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  makeGetReq(path: string) {
    return this.http.get(`${this.apiUrl}${path}`, { headers: this.setHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }


  signUp(userInfo: any) {
    return this.makePostReq('/user/register', userInfo);
  }

  logIn(userInfo: any) {
    return this.makePostReq('/user/login', userInfo);
  }

  getMoments() {
    return this.makeGetReq('/moments');
  }
}
