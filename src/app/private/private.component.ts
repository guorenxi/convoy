import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ORGANIZATION_DATA } from '../models/organization.model';
import { PrivateService } from './private.service';

@Component({
	selector: 'app-private',
	templateUrl: './private.component.html',
	styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
	showOrgDropdown = false;
	showMoreDropdown = false;
	organisations!: ORGANIZATION_DATA[];
	showLoader: boolean = false;
	constructor(private router: Router, private privateService: PrivateService) {}

	ngOnInit() {
		this.getOrganizations();
	}

	authDetails() {
		const authDetails = localStorage.getItem('CONVOY_AUTH');
		return authDetails ? JSON.parse(authDetails) : false;
	}

	async logout() {
		this.showLoader = true;
		try {
			const response: any = await this.privateService.logout();
			if (response) {
				this.router.navigateByUrl('/login');
			}
			this.showLoader = false;
		} catch (error) {
			this.showLoader = false;
		}
	}

	async getOrganizations() {
		const userId = localStorage.getItem('USER_ID');
		console.log(userId);
		const requestOptions = {
			userId: `userId=${userId}`
		};
		try {
			const response = await this.privateService.getOrganizations(requestOptions);
			this.organisations = response.data;
			const userOrganisation = this.organisations.find(organisation => organisation.members.some(item => item.id === userId));
			const organisationId = userOrganisation?.id;
			if (organisationId) localStorage.setItem('orgId', organisationId);
		} catch (error) {}
	}
}
