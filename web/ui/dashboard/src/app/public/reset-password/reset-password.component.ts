import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup = this.formBuilder.group({
		password: ['', Validators.required],
		newPassword: ['', Validators.required]
	});
	showPassword: boolean = false;
	showCofirmPassword: boolean = false;
	activePage: 'reset-password' | 'success' = 'reset-password';

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

	resetPassword() {
		this.activePage = 'success';
	}
}
