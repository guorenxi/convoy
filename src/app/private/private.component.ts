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
	userOrganization!: ORGANIZATION_DATA;
	showLoader: boolean = false;
	showAddOrganisationModal: boolean = false;
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
				localStorage.clear();
			}

			this.showLoader = false;
		} catch (error) {
			this.showLoader = false;
		}
	}

	async getOrganizations() {
		const userDetails = localStorage.getItem('USER_DETAILS') || '';
		const { id } = JSON.parse(userDetails);
		const requestOptions = {
			userId: `userId=${id}`
		};
		try {
			const response = await this.privateService.getOrganizations(requestOptions);
			this.organisations = response.data;
			const setOrg = localStorage.getItem('ORG_DETAILS');
			if (!setOrg) {
				this.selectOrganisation(this.organisations[0]);
			} else {
				this.userOrganization = JSON.parse(setOrg);
			}
		} catch (error) {}
	}

	selectOrganisation(organisation: ORGANIZATION_DATA) {
		const userOrganisation = organisation;
		this.userOrganization = userOrganisation;
		localStorage.setItem('ORG_DETAILS', JSON.stringify(userOrganisation));
		const organisationId = userOrganisation?.id;
		if (organisationId) localStorage.setItem('orgId', organisationId);
		const currentUrl = this.router.url;
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this.router.navigate([currentUrl]);
		});
	}

	autoClose(event: any) {
		var target = event.target;
		if (!target.closest('.drop-down')) {
			if (this.showOrgDropdown) {
				this.showOrgDropdown = false;
			}
			if (this.showMoreDropdown) {
				this.showMoreDropdown = false;
			}
		}
	}

	closeAddOrganisationModal() {
		this.showAddOrganisationModal = false;
		this.getOrganizations();
	}
}
