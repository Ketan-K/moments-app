import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private data: DataService
  ) {
  }

  setHeaders() {
    let headers = new HttpHeaders({});
    let user = this.data.getUser();
    if (user.authToken) {
      headers = headers.append('authToken', user.authToken);
    }
    console.log('Userrrrr', user, headers)
    return headers;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: this.setHeaders()
    });
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.openSnackBar('Please login first', '')
          this.router.navigateByUrl("/login");
        }
        return throwError(response);
      }
      ));
  }
}