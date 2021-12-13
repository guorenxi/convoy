import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required]
	});

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

	resetPassword() {}
}
