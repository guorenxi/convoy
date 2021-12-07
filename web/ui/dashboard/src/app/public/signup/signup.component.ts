import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	showLoginPassword = false;
	disableLoginBtn = false;
	signupForm: FormGroup = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required]
	});
	activeStep: 'basic' | 'otp' = 'basic';

	constructor(private formBuilder: FormBuilder, private router: Router) {}

	ngOnInit(): void {}

	async signup() {
		localStorage.setItem('CONVOY_AUTH', JSON.stringify(this.signupForm.value));
		this.router.navigateByUrl('dashboard');
	}
}
