import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	activePage: 'profile' | 'organisation' | 'billing' = 'profile';
	showChangePasswordModal: boolean = true;
	passwordToggle = { oldPassword: false, newPassword: false, confirmPassword: false };

	constructor(private accountService:AccountService, private router:Router) {}

	ngOnInit(): void {}

	async logout() {
		try {
			const response: any = await this.accountService.logout();
			if (response) {
				this.router.navigateByUrl('/login');
			}
		} catch (error) {
		}
	}
}
