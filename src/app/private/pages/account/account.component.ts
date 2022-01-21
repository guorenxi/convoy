import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { AccountService } from './account.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	activePage: 'profile' | 'security' | 'billing' = 'profile';
	savingDetails: boolean = false;
	changingPassword: boolean = false;
	passwordsMatch: boolean = false;
	id!: string;
	passwordToggle = { oldPassword: false, newPassword: false, confirmPassword: false };
	editBasicInfoForm: FormGroup = this.formBuilder.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', Validators.required]
	});
	changePasswordForm: FormGroup = this.formBuilder.group({
		current_password: ['', Validators.required],
		password: ['', Validators.required],
		password_confirmation: ['', Validators.required]
	});
	constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder, private generalService: GeneralService) {}

	ngOnInit() {
		this.authDetails();
	}

	authDetails() {
		const authDetails = localStorage.getItem('USER_DETAILS');
		if (authDetails) {
			const user = JSON.parse(authDetails);
			this.id = user?.id;
			this.editBasicInfoForm.patchValue({
				firstname: user?.profile?.firstname,
				lastname: user?.profile?.lastname,
				email: user?.email
			});
		}
	}
	async logout() {
		try {
			const response: any = await this.accountService.logout();
			if (response) {
				this.router.navigateByUrl('/login');
				localStorage.clear();
			}
		} catch (error) {}
	}

	async editBasicUserInfo() {
		if (this.editBasicInfoForm.invalid) {
			(<any>Object).values(this.editBasicInfoForm.controls).forEach((control: FormControl) => {
				control?.markAsTouched();
			});
			return;
		}
		this.savingDetails = true;
		const requestOptions = {
			userId: this.id
		};
		try {
			const response = await this.accountService.editBasicInfo(this.editBasicInfoForm.value, requestOptions);
			this.generalService.showNotification({ message: 'Changes saved successfully!' });
			localStorage.setItem('USER_DETAILS', JSON.stringify(response.data));
			this.savingDetails = false;
		} catch {
			this.savingDetails = false;
		}
	}

	async changePassword() {
		if (this.changePasswordForm.invalid) {
			(<any>Object).values(this.changePasswordForm.controls).forEach((control: FormControl) => {
				control?.markAsTouched();
			});
			return;
		}
		this.changingPassword = true;
		try {
			const response = await this.accountService.changePassword(this.changePasswordForm.value);
			if (response.status == true) {
				this.generalService.showNotification({ message: response.message });
				this.changePasswordForm.reset();
			}
			this.changingPassword = false;
		} catch {
			this.changingPassword = false;
		}
	}

	checkPassword() {
		const newPassword = this.changePasswordForm.value.password;
		const confirmPassword = this.changePasswordForm.value.password_confirmation;
		if (newPassword == confirmPassword) {
			this.passwordsMatch = true;
		} else {
			this.passwordsMatch = false;
		}
	}
}
