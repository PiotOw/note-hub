import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AuthRequest} from './auth-request.model';

@Injectable({
	providedIn: 'root',
})
export class LoginService {

	private static readonly localStorageJWTKey: string = 'access_token';

	constructor(private httpClient: HttpClient, private router: Router) {
	}

	public static getToken(): string {
		return localStorage.getItem(LoginService.localStorageJWTKey);
	}

	public redirectToLoginPage(): Observable<boolean> {
		return fromPromise(this.router.navigate(['/login']));
	}

	public login(loginRequest: AuthRequest): Observable<any> {
		const link: string = `${environment.BASE_API_URL}/token/`;
		return this.httpClient.post<{ refresh: string, access: string }>(link, loginRequest).pipe(
			map(res => {
				localStorage.setItem(LoginService.localStorageJWTKey, res.access);
			})
		);
	}

	public logout(): void {
		localStorage.removeItem(LoginService.localStorageJWTKey);
	}
}
