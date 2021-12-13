import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-private',
	templateUrl: './private.component.html',
	styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
	showOrgDropdown = false;
	showMoreDropdown = false;

	constructor(private router: Router) {}

	ngOnInit(): void {}

	authDetails() {
		const authDetails = localStorage.getItem('CONVOY_AUTH');
		return authDetails ? JSON.parse(authDetails) : false;
	}

	logout() {
		localStorage.removeItem('CONVOY_AUTH');
		this.router.navigateByUrl('/login');
	}
}
