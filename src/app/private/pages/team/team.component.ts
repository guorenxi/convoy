import { Component, OnInit } from '@angular/core';

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

	constructor() {}

	ngOnInit(): void {}
}
