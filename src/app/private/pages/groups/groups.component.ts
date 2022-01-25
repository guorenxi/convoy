import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	loading: boolean = false;
	noData: boolean = false;
	disableEndpoint!: boolean;
	groups!: GROUP[];
	showLoader: boolean = false;
	showGroupDropdown: boolean = false;
	currentId!: string;
	selectedGroup!: GROUP;
	showDeleteGroupModal: boolean = false;
	showGroupSettingModal: boolean = false;
	editMode: boolean = false;
	deletingGroup: boolean = false;
	constructor(private groupService: GroupsService, private generalService: GeneralService, private router: Router) {}

	ngOnInit() {
		this.getGroups();
	}

	async getGroups() {
		this.showLoader = true;
		const orgId = localStorage.getItem('orgId');
		const requestOptions = {
			orgId: `org_id=${orgId}`
		};
		try {
			const response = await this.groupService.getGroups(requestOptions);
			response.data.length ? (this.noData = false) : (this.noData = true);
			this.showLoader = false;
			this.groups = response.data;
		} catch {
			this.showLoader = true;
		}
	}

	showDropdown(id: string) {
		if (this.currentId === id) {
			this.currentId = '';
		} else {
			this.currentId = id;
		}
	}

	viewGroupSettings(group: GROUP) {
		this.currentId = '';
		this.selectedGroup = group;
		this.showGroupSettingModal = true;
	}

	viewGroup(id: string) {
		this.router.navigate(['/projects/' + id]);
	}
	async deleteGroup() {
		const orgId = localStorage.getItem('orgId');
		this.deletingGroup = true;
		const requestOptions = {
			orgId: `org_id=${orgId}`,
			groupId: this.selectedGroup?.id
		};
		try {
			const response = await this.groupService.deleteGroup(requestOptions);
			this.generalService.showNotification({ message: response.message });
			this.showDeleteGroupModal = false;
			this.showGroupSettingModal = false;
			this.deletingGroup = false;
			this.getGroups();
		} catch {
			this.deletingGroup = false;
		}
	}

	closeCreateGroupModal(fetchGroups: boolean) {
		this.showCreateGroupModal = false;
		this.editMode = false;
		if (fetchGroups) this.getGroups();
	}
}
