import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {LoginService} from './login.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

	constructor(private router: Router, private loginService: LoginService) {

	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (error.status === 401) {
						this.loginService.logout();
						this.loginService.redirectToLoginPage();
					}
					return throwError(error);
				})
			);
	}
}
