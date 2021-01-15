import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';

import {LoginService} from './login.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private loginService: LoginService) {

	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> {
		return this.checkIsLoggedIn();
	}

	public canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> {
		return this.checkIsLoggedIn();
	}

	private checkIsLoggedIn(): Observable<boolean> {
		const token: string = LoginService.getToken();

		if (!token) {
			return this.loginService.redirectToLoginPage();
		} else {
			return of(true);
		}
	}
}
