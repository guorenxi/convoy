import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { LoginService } from './login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	showLoginPassword = false;
	disableLoginBtn = false;
	loginForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required]
	});

	constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private generalService: GeneralService) {}

	ngOnInit(): void {}

	async login() {
		if (this.loginForm.invalid) {
			(<any>Object).values(this.loginForm.controls).forEach((control: FormControl) => {
				control?.markAsTouched();
			});
			return;
		}

		this.disableLoginBtn = true;
		try {
			const response: any = await this.loginService.login(this.loginForm.value);


			localStorage.setItem('CONVOY_AUTH', JSON.stringify(response.data));
			this.generalService.showNotification({ message: response.message });
			const userId = response.data?.user?.id;
			localStorage.setItem('USER_ID', userId)
			this.disableLoginBtn = false;
			this.router.navigateByUrl('dashboard');
		} catch (error) {
			this.disableLoginBtn = false;
		}
	}

	
}
