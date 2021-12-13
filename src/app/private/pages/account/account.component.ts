import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	activePage: 'profile' | 'organisation' | 'billing' = 'profile';
	showChangePasswordModal: boolean = true;
	passwordToggle = { oldPassword: false, newPassword: false, confirmPassword: false };

	constructor() {}

	ngOnInit(): void {}
}
