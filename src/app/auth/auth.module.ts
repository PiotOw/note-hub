import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoginService} from './login.service';
import {AuthGuard} from './auth.guard';
import {AuthInterceptor} from './auth.interceptor';
import {UnauthorizedInterceptor} from './unauthorized.interceptor';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
	],
	providers: [
		LoginService,
		AuthGuard,
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
	],
})
export class AuthModule {
}
