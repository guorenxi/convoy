import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
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
	showFilterCalendar: boolean = false;
	showEventFilterCalendar: boolean = false;
	statsDateRange: FormGroup = this.formBuilder.group({
		startDate: [{ value: new Date(new Date().setDate(new Date().getDate() - 30)), disabled: true }],
		endDate: [{ value: new Date(), disabled: true }]
	});
	eventsFilterDateRange: FormGroup = this.formBuilder.group({
		startDate: [{ value: '', disabled: true }],
		endDate: [{ value: '', disabled: true }]
	});
	tabs: ['messages', 'apps'] = ['messages', 'apps'];
	activeTab: 'messages' | 'apps' = 'messages';
	detailsTabs = [
		{ id: 'response', label: 'Response' },
		{ id: 'request', label: 'Request' }
	];
	detailsActiveTab: 'response' | 'request' = 'response';
	eventApp!: string;
	lineChart: any = [];
	showEditGroupModal: boolean = false;
	editMode: boolean = true;
	environment = environment;

	constructor(private route: ActivatedRoute, private viewGroupService: ViewGroupService, private formBuilder: FormBuilder, private location: Location) {}

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
			this.messagesChart();
			this.showLoader = false;
		} catch {
			this.showLoader = false;
		}
	}

	fetchGroupData() {}

	goBack() {
		this.location.back();
	}

	clearEventFilters(tableName: 'messages' | 'apps') {}

	switchActiveTab(tab: 'messages' | 'apps') {
		tab == 'messages' ? (this.activeTab = 'messages') : (this.activeTab = 'apps');
	}
	switchDetailsActiveTab(tab: string) {
		tab == 'response' ? (this.detailsActiveTab = 'response') : (this.detailsActiveTab = 'request');
	}

	getEvents(requestDetails?: { appId?: string; addToURL?: boolean }) {}

	messagesChart() {
		const labels = ['1', '5', '10', '15', '20'];
		const data = [100, 1000, 800, 2500, 3000];
		this.lineChart = new Chart('messagesCanvas', {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						data: data,
						borderColor: '#477DB3',
						tension: 0.5,
						yAxisID: 'yAxis',
						xAxisID: 'xAxis'
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					xAxis: {
						display: true,
						grid: {
							display: false
						}
					},
					yAxis: {
						display: true,
						grid: {
							display: false
						}
					}
				}
			}
		});
	}
}
