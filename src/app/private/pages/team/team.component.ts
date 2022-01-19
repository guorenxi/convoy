import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GROUP } from 'src/app/models/group.model';
import { TEAMS } from 'src/app/models/team.model';
import { GeneralService } from 'src/app/services/general/general.service';
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
	noSearch: boolean = false;
	searchMode: boolean = false;
	deactivatingUser: boolean = false;
	searchingMembers: boolean = false;
	searchText!: string;
	teams!: TEAMS[];
	groups!: GROUP[];
	filteredGroups!: GROUP[];
	selectedGroups: GROUP[] = [];
	noOfSelectedGroups!: string;
	invitingUser: boolean = false;
	currentId!: string;
	inviteUserForm: FormGroup = this.formBuilder.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', Validators.compose([Validators.required, Validators.email])],
		role: ['', Validators.required],
		groups: [[], Validators.required]
	});

	constructor(private teamService: TeamService, private groupService: GroupsService, private formBuilder: FormBuilder, private generalService: GeneralService) {}

	async ngOnInit() {
		await Promise.all([this.fetchTeamMembers(), this.getGroups()]);
	}

	async fetchTeamMembers() {
		const orgId = localStorage.getItem('orgId') || '';
		const requestOptions = {
			orgId: orgId
		};
		this.loading = true;
		this.noSearch = false;
		this.searchMode = false;
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

	async searchTeam(searchInput: any) {
		this.searchMode = true;
		const searchString = searchInput;
		this.searchText = searchString;
		const orgId = localStorage.getItem('orgId') || '';
		const requestOptions = {
			orgId: orgId,
			query: `?query=${searchString}`
		};
		this.searchingMembers = true;
		try {
			const response = await this.teamService.searchTeamMembers(requestOptions);
			if (response.data.length) this.teams = response.data;
			response.data.length ? (this.noSearch = false) : (this.noSearch = true);
			this.searchingMembers = false;
		} catch {
			this.searchingMembers = false;
		}
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
		if (this.inviteUserForm.invalid) {
			(<any>this.inviteUserForm).values(this.inviteUserForm.controls).forEach((control: FormControl) => {
				control?.markAsTouched();
			});
			return;
		}
		try {
			const response = await this.teamService.inviteUserToOrganisation(this.inviteUserForm.value, requestOptions);
			if (response.data) this.showSuccessModal = true;
			this.showInviteTeamMemberModal = false;
			this.inviteUserForm.reset();
			this.fetchTeamMembers();
			this.invitingUser = false;
		} catch {
			this.invitingUser = false;
		}
	}

	async deactivateMember() {
		const orgId = localStorage.getItem('orgId');
		this.deactivatingUser = true;
		const requestOptions = {
			orgId: orgId || '',
			memberId: this.selectedMember?.id
		};
		try {
			const response = await this.teamService.deactivateTeamMember(requestOptions);
			if (response.status) this.showDeactivateModal = false;
			this.generalService.showNotification({ message: response.message });
			this.fetchTeamMembers();
			this.deactivatingUser = false;
		} catch {
			this.deactivatingUser = false;
		}
	}

	showDropdown(id: string) {
		if (this.currentId == id) {
			this.currentId = '';
		} else {
			this.currentId = id;
		}
	}
}
