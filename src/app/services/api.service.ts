import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.router.navigateByUrl("/login");
    }
    return throwError(error.message || 'Internal Server Error')

  }
  makePostReq(path: string, data: any) {
    return this.http.post(`${this.apiUrl}${path}`, data)
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
}
