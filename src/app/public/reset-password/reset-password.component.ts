import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
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
	resetingPassword: boolean = false;
	activePage: 'reset-password' | 'success' = 'reset-password';
	token!: string;

	constructor(private formBuilder: FormBuilder, private resetPasswordService: ResetPasswordService, private route: ActivatedRoute, private generalService: GeneralService) {}

	ngOnInit() {
		this.getToken();
	}
	getToken() {
		this.route.queryParams.subscribe(res => {
			this.token = res.token;
		});
	}
	async resetPassword() {
		this.activePage = 'success';
		this.resetPasswordForm.patchValue({
			reset_password_token: this.token
		});
		const payload = {
			user: this.resetPasswordForm.value
		};
		this.resetingPassword = true;
		try {
			const response = await this.resetPasswordService.resetPassword(payload);
			if (response.data) this.activePage = 'success';
			this.generalService.showNotification({ message: response.message });
			this.resetingPassword = false;
		} catch {
			this.resetingPassword = false;
		}
	}
}
