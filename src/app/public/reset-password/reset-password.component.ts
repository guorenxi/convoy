import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup = this.formBuilder.group({
		reset_password_token: ['', Validators.required],
		password: ['', Validators.required],
		password_confirmation: ['', Validators.required]
	});
	showPassword: boolean = false;
	showCofirmPassword: boolean = false;
	activePage: 'reset-password' | 'success' = 'reset-password';

	constructor(private formBuilder: FormBuilder, private resetPasswordService:ResetPasswordService) {}

	ngOnInit(): void {}

	async resetPassword() {
		this.activePage = 'success';
		const payload = {
			user: this.resetPasswordForm.value
		}
		try{
			const response = await this.resetPasswordService.resetPassword(payload)
		}
		catch{
			
		}
	}
}
