import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GROUP } from 'src/app/models/group.model';
import { TEAMS } from 'src/app/models/team.model';
import { GroupsService } from '../groups/groups.service';
import { TeamService } from './team.service';

@Component({
	selector: 'app-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
	showInviteTeamMemberModal: boolean = false;
	showTeamMemberDropdown: boolean = false;
	showTeamGroupDropdown: boolean = false;
	showSuccessModal: boolean = false;
	showDeactivateModal: boolean = false;
	selectedMember!: TEAMS;
	loading: boolean = false;
	noData: boolean = false;
	searchMode: boolean = false;
	deactivatingUser: boolean = false;
	teams!: TEAMS[];
	groups!: GROUP[];
	filteredGroups!: GROUP[];
	selectedGroups: GROUP[] = [];
	noOfSelectedGroups!: string;
	invitingUser: boolean = false;
	inviteUserForm: FormGroup = this.formBuilder.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', Validators.required],
		role: ['', Validators.required],
		groups: [[], Validators.required]
	});

	constructor(private teamService: TeamService, private groupService: GroupsService, private formBuilder: FormBuilder) {}

	async ngOnInit() {
		await Promise.all([this.fetchTeamMembers(), this.getGroups()]);
	}

	async fetchTeamMembers() {
		const orgId = localStorage.getItem('orgId') || '';
		const requestOptions = {
			orgId: orgId
		};
		this.loading = true;
		try {
			const response = await this.teamService.getTeamMembers(requestOptions);
			if (response.data.length) this.teams = response.data;
			response.data.length ? (this.noData = false) : (this.noData = true);

			this.loading = false;
		} catch {
			this.loading = false;
		}
	}

	async getGroups() {
		const orgId = localStorage.getItem('orgId') || '';
		const requestOptions = {
			orgId: `org_id=${orgId}`
		};
		try {
			const response = await this.groupService.getGroups(requestOptions);
			this.groups = response.data;
			this.filteredGroups = response.data;
		} catch {}
	}

	searchGroup(searchInput: any) {
		const searchString = searchInput.target.value;
		if (searchString) {
			this.filteredGroups = this.groups.filter(element => {
				let filteredGroups = element.name.toLowerCase();
				return filteredGroups.includes(searchString);
			});
		} else {
			this.filteredGroups = this.groups;
		}
	}

	searchTeam(searchInput: any) {
		this.searchMode = true;
		const searchString = searchInput.target.value;
		console.log(searchString)
	}

	selectGroup(group: GROUP) {
		const id = group.id;
		if (this.selectedGroups?.length) {
			const groupExists = this.selectedGroups.find(item => item.id == id);
			if (groupExists) {
				this.selectedGroups = this.selectedGroups.filter(group => group.id != id);
			} else {
				this.selectedGroups.push(group);
			}
		} else {
			this.selectedGroups.push(group);
		}
		this.noOfSelectedGroups = `${this.selectedGroups?.length} group${this.selectedGroups?.length == 1 ? '' : 's'}`;
	}
	async inviteUser() {
		const orgId = localStorage.getItem('orgId');
		const groupIds = this.selectedGroups.map(item => item.id);
		this.invitingUser = true;
		const requestOptions = {
			orgId: orgId || ''
		};
		this.inviteUserForm.patchValue({
			groups: groupIds
		});
		console.log(groupIds);
		try {
			const response = await this.teamService.inviteUserToOrganisation(this.inviteUserForm.value, requestOptions);
			if (response) this.showSuccessModal = true;
			console.log(response);
			this.invitingUser = false;
		} catch {
			this.invitingUser = false;
		}
	}

	deactivateMember() {}
}
