import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { SignupService } from './signup.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	showLoginPassword = false;
	disableLoginBtn = false;
	signupForm: FormGroup = this.formBuilder.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', Validators.required],
		org_name: ['', Validators.required],
		password: ['', Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}$')])]
	});
	activeStep: 'basic' | 'otp' = 'basic';
	loading: boolean = false;
	constructor(private formBuilder: FormBuilder, private router: Router, private generalService: GeneralService, private signupService: SignupService) {}

	ngOnInit(): void {}

	async signup() {
		if (this.signupForm.invalid) {
			(<any>this.signupForm).values(this.signupForm.controls).forEach((control: FormControl) => {
				control?.markAsTouched();
			});
			return;
		}
		this.loading = true;
		try {
			const response = await this.signupService.signup(this.signupForm.value);
			if (response.data) this.router.navigateByUrl('login');
			this.generalService.showNotification({ message: response.message });
			this.loading = false;
		} catch {
			this.loading = false;
		}
		// localStorage.setItem('CONVOY_AUTH', JSON.stringify(this.signupForm.value));
		// this.router.navigateByUrl('dashboard');
		// this.activeStep = 'otp'
	}
}
