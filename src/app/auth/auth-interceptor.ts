import { Injectable } from '@angular/core';
import {
HttpRequest,
HttpHandler,
HttpEvent,
HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private router: Router) {}

intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    var token = localStorage.getItem('token');
        if (token != null) {
            const clonedReq = req.clone({headers: req.headers.set('Authorization', 'Basic ' + token)});
            return next.handle(clonedReq).pipe(tap(
                succ => {
                    
                }, error => {
                    if (error.status == 401) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('object');
                        this.router.navigate(['/account/login']);
                    }
                }
            ));
        } else {
            return next.handle(req.clone());
        }
}

}
