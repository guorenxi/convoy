import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GeneralService } from 'src/app/services/general/general.service';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required]
	});
	activeState: 'resetPassword' | 'instructionSent' = 'resetPassword';
	loading: boolean = false;
	constructor(private formBuilder: FormBuilder, private forgotPasswordService: ForgotPasswordService, private generalService: GeneralService) {}

	ngOnInit(): void {}

	async resetPassword() {
		const payload = {
			user: this.forgotPasswordForm.value
		};
		try {
			const response = await this.forgotPasswordService.forgotPassword(payload);
			if (response.status) {
				this.activeState = 'instructionSent';
				this.generalService.showNotification({ message: response.message });
			}

			this.loading = false;
		} catch (error) {
			this.loading = false;
			throw error;
		}
	}
}
