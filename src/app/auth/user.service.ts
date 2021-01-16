import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	constructor(private http: HttpClient) {
	}

	public registerUser(request): Observable<any> {
		const link = `${environment.BASE_API_URL}/auth/signup`;
		const data = {
			username: request.username,
			email: request.email,
			password: request.password,
		};
		return this.http.post<any>(link, data);
	}
}
