import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../auth/login.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

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
		this.router.navigate(['/dashboard']);
	}

	register() {
		this.router.navigate(['/register']);
	}
}
