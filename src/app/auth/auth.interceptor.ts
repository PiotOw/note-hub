import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {LoginService} from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const idToken: string = LoginService.getToken();

		if (idToken) {
			const cloned: HttpRequest<any> = req.clone({
				headers: req.headers
					.set('Authorization', 'Bearer ' + idToken)
					.set('Content-Type', 'application/json'),
			});

			return next.handle(cloned);
		}

		return next.handle(req);
	}
}
