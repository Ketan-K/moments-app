import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.router.navigateByUrl("/login");
        }
        return throwError(response);
      }
      ));
  }
}