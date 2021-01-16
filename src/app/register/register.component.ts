import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PasswordStrength} from '../enums/PasswordStrength.enum';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../auth/user.service';
import {MessageComponent} from '../message/message.component';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm = new FormGroup({
		username: new FormControl(null, Validators.required),
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, Validators.required)
	})

	constructor(private router: Router,
				private dialog: MatDialog,
				private api: UserService) {
	}

	ngOnInit(): void {
	}

	register() {
		const dialogRef = this.dialog.open(MessageComponent);
		if (this.registerForm.valid) {
			dialogRef.componentInstance.showSpinner = true;
			const data = {
				username: this.registerForm.controls['username'].value,
				email: this.registerForm.controls['email'].value,
				password: this.registerForm.controls['password'].value,
			}
			this.api.registerUser(data).subscribe(res => {
				dialogRef.componentInstance.showSpinner = false;
				dialogRef.componentInstance.message = 'Registered successfully!';
				this.router.navigate(['/login']);
			}, error => {
				dialogRef.componentInstance.showSpinner = false;
				dialogRef.componentInstance.message = error.error.message;
			})
		} else {
			dialogRef.componentInstance.showSpinner = false;
			dialogRef.componentInstance.message = 'Enter right credentials';
		}
	}

	goToLogin() {
		this.router.navigate(['/login']);
	}

	getPasswordStrength(): PasswordStrength {
		if (this.registerForm.controls['password'].value) {
			const password = this.registerForm.controls['password'].value;
			const set = {};
			password.split('').forEach(
				c => (set[c] ? set[c]++ : (set[c] = 1))
			);
			const entropy = Object.keys(set).reduce((acc, c) => {
				const p = set[c] / password.length;
				return acc - (p * (Math.log(p) / Math.log(2)));
			}, 0);

			if (entropy < 1.0) {
				return PasswordStrength.VERY_WEAK
			} else if (entropy < 2) {
				return PasswordStrength.WEAK;
			} else if (entropy < 3) {
				return PasswordStrength.MEDIUM;
			} else if (entropy < 4) {
				return PasswordStrength.STRONG;
			} else {
				return PasswordStrength.VERY_STRONG;
			}
		} else {
			return null;
		}
	}

	getDivClass(): string {
		switch (this.getPasswordStrength()) {
			case PasswordStrength.VERY_WEAK:
				return 'password-very-weak';
			case PasswordStrength.WEAK:
				return 'password-weak';
			case PasswordStrength.MEDIUM:
				return 'password-medium';
			case PasswordStrength.STRONG:
				return 'password-strong';
			case PasswordStrength.VERY_STRONG:
				return 'password-very-strong';
		}
		return null
	}

}
