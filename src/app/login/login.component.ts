import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../auth/login.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MessageComponent} from '../message/message.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm = new FormGroup({
		username: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required)
	})

	constructor(private loginService: LoginService,
				private router: Router,
				private    dialog: MatDialog) {
	}

	ngOnInit(): void {
	}

	login() {
		const dialogRef = this.dialog.open(MessageComponent);
		if (this.loginForm.valid) {
			dialogRef.componentInstance.showSpinner = true;
			const data = {
				username: this.loginForm.controls['username'].value,
				password: this.loginForm.controls['password'].value
			}
			this.loginService.login(data).subscribe(res => {
				dialogRef.componentInstance.showSpinner = false;
				dialogRef.componentInstance.message = 'You\'ve been logged in!';
				this.router.navigate(['/dashboard']);
			}, error => {
				dialogRef.componentInstance.showSpinner = false;
				dialogRef.componentInstance.message = error.error.message;
			})
		} else {
			dialogRef.componentInstance.showSpinner = false;
			dialogRef.componentInstance.message = 'Enter right credentials';
		}


	}

	register() {
		this.router.navigate(['/register']);
	}
}
