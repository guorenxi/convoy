import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganisationSettingsService } from './organisation-settings.service';

@Component({
	selector: 'app-organisation-settings',
	templateUrl: './organisation-settings.component.html',
	styleUrls: ['./organisation-settings.component.scss']
})
export class OrganisationSettingsComponent implements OnInit {
	activePage: 'general settings' | 'billing' | 'danger zone' = 'general settings';
	showDeactivateAccountModal: boolean = false;
	editAccountForm: FormGroup = this.formBuilder.group({
		name: ['', Validators.required],
		id: ['', Validators.required]
	});
	deactivateAccountForm: FormGroup = this.formBuilder.group({
		reasons: ['', Validators.required]
	});
	reasonsForDeactivation = [
		{ reason: 'I’m switching to another platform', selected: false },
		{ reason: 'Convoy is too expensive', selected: false },
		{ reason: 'I am dissatisfied with convoy services', selected: false },
		{ reason: 'Others reasons I can’t say', selected: false }
	];
	constructor(private formBuilder: FormBuilder, private organisationSerive: OrganisationSettingsService, private router: Router) {}

	ngOnInit(): void {}
	async logout() {
		try {
			const response: any = await this.organisationSerive.logout();
			if (response) {
				this.router.navigateByUrl('/login');
				localStorage.clear();
			}
		} catch (error) {}
	}

	selectReason(reason: any) {}
}
