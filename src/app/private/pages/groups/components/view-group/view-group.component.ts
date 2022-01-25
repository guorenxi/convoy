import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GROUP } from 'src/app/models/group.model';
import { environment } from 'src/environments/environment';
import { ViewGroupService } from './view-group.service';

@Component({
	selector: 'app-view-group',
	templateUrl: './view-group.component.html',
	styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
	showLoader: boolean = false;
	id!: string;
	groupDetails!: GROUP;
	showEditGroupModal: boolean = false;
	editMode: boolean = true;
	environment = environment;

	constructor(private route: ActivatedRoute, private viewGroupService: ViewGroupService) {}

	ngOnInit() {
		this.getId();
	}

	getId() {
		this.route.params.subscribe(res => {
			this.id = res.id;
			this.getGroupDetails();
		});
	}
	async getGroupDetails() {
		const orgId = localStorage.getItem('orgId');
		const requestOptions = {
			groupId: this.id,
			orgId: `org_id=${orgId}`
		};
		this.showLoader = true;
		try {
			const response = await this.viewGroupService.viewGroup(requestOptions);
			if (response.data) this.groupDetails = response.data;
			this.showLoader = false;
		} catch {
			this.showLoader = false;
		}
	}

	requestToken(): string {
		const localStorageItem = localStorage.getItem('CONVOY_AUTH');
		const authDetails = localStorageItem ? JSON.parse(localStorageItem) : false;
		if (authDetails) {
			const { managed_service_token } = authDetails;
			return managed_service_token;
		} else {
			return '';
		}
	}
}
