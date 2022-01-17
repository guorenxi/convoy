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
	activePage: 'profile' | 'organisation' | 'billing' = 'profile';
	showChangePasswordModal: boolean = false;
	savingDetails: boolean = false;
	id!: string;
	passwordToggle = { oldPassword: false, newPassword: false, confirmPassword: false };
	editBasicInfoForm: FormGroup = this.formBuilder.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', Validators.required]
	});
	constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder, private generalService:GeneralService) {}

	ngOnInit() {
		this.authDetails();
	}

	authDetails() {
		const authDetails = localStorage.getItem('USER_DETAILS');
		if (authDetails) {
			const user = JSON.parse(authDetails);
			this.id = user?.id;
			console.log(user);
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
			this.generalService.showNotification({message: 'Changes saved successfully!'})
			localStorage.setItem('USER_DETAILS', JSON.stringify(response.data));
			this.savingDetails = false;
		} catch {
			this.savingDetails = false;
		}
	}
}
