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
	loading: boolean = false;
	noData: boolean = false;
	teams!: TEAMS[];
	groups!: GROUP[];
	filteredGroups!: GROUP[];
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
			this.filteredGroups = response.data
		} catch {}
	}

	searchGroup(searchInput: any) {
		console.log(searchInput)
		const searchString = searchInput.target.value
		console.log(searchString)
		if (searchString) {
			this.filteredGroups = this.groups.filter(element => {
				let filteredGroups = element.name.toLowerCase();
				return filteredGroups.includes(searchString);
			});
		} else {
			this.filteredGroups = this.groups;
		}
	}

	selectGroup(group: GROUP) {
		
	}
	async inviteUser() {}
}
