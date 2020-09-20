import { error } from 'protractor';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from 'app/login/login.service';
import { NotificationDialogService } from 'services/notificationDialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: LoginService, private NotificationDialogService: NotificationDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
                location.reload();
                this.NotificationDialogService.success('your session is expired!');

            }else if(err.status === 400 || err.status === 404 || err.status === 500  ) {

                this.NotificationDialogService.warn(err.error.message);

            } else if(err.status === 403){
                this.NotificationDialogService.warn("You Don't have permission Use This Funcation");
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}