import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GROUP } from 'src/app/models/group.model';
import { GeneralService } from 'src/app/services/general/general.service';
import { GroupsService } from './groups.service';

@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
	showCreateGroupModal: boolean = false;
	showLoginPassword: boolean = false;
	createGroupForm: FormGroup = this.formBuilder.group({
		name: ['', Validators.required],
		retry: this.formBuilder.group({
			interval_seconds: ['', Validators.required],
			limit: ['', Validators.required]
		}),
		signature: this.formBuilder.group({
			header: ['', Validators.required],
			hash: ['', Validators.required],
			disable_endpoint: [false, Validators.required]
		}),
		password: ['', Validators.required]
	});
	loading: boolean = false;
	noData: boolean = false;
	groups!: GROUP[];
	constructor(private formBuilder: FormBuilder, private groupService: GroupsService, private generalService: GeneralService) {}

	ngOnInit() {
		this.getGroups();
	}

	async createGroup() {
		const orgId = localStorage.getItem('orgId');
		this.loading = true;
		const requestOptions = {
			orgId: `org_id=${orgId}`
		};
		try {
			const response = await this.groupService.createGroup(this.createGroupForm.value, requestOptions);
			this.showCreateGroupModal = false;
			this.createGroupForm.reset();
			this.generalService.showNotification({ message: response.message });
			this.getGroups();
			this.loading = false;
		} catch (error) {
			this.loading = false;
		}
	}

	async getGroups() {
		console.log(localStorage.getItem('orgId'));
		const orgId = localStorage.getItem('orgId');
		const requestOptions = {
			orgId: `org_id=${orgId}`
		};
		try {
			const response = await this.groupService.getGroups(requestOptions);
			response.data.length ? (this.noData = false) : (this.noData = true);
			this.groups = response.data;
		} catch (error) {}
	}
}
