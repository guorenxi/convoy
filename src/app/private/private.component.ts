import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ORGANIZATION_DATA } from '../models/organization.model';
import { LoginService } from '../public/login/login.service';

@Component({
	selector: 'app-private',
	templateUrl: './private.component.html',
	styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
	showOrgDropdown = false;
	showMoreDropdown = false;
	organisations!: ORGANIZATION_DATA[];

	constructor(private router: Router, private loginService:LoginService ) {}

	ngOnInit() {
		this.getOrganizations()
	}

	authDetails() {
		const authDetails = localStorage.getItem('CONVOY_AUTH');
		return authDetails ? JSON.parse(authDetails) : false;
	}

	logout() {
		localStorage.removeItem('CONVOY_AUTH');
		this.router.navigateByUrl('/login');
	}

	async getOrganizations() {
		const userId = localStorage.getItem('USER_ID')
		const requestOptions = {
			userId: `userId=${userId}`
		};
		try {
			const response = await this.loginService.getOrganizations(requestOptions);
			console.log(response);
			this.organisations = response.data;
			const userOrganisation = this.organisations.find(organisation => organisation.members.some(item => item.id === userId))
			const organisationId = userOrganisation?.id
			if(organisationId) localStorage.setItem('orgId', organisationId)
			console.log(organisationId);
		} catch (error) {}
	}
}
