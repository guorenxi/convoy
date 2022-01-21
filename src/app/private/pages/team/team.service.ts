import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'src/app/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class TeamService {
	constructor(private http: HttpService) {}

	async getTeamMembers(requestOptions: { orgId: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: `organizations/${requestOptions.orgId}/members`,
				method: 'get'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}

	async inviteUserToOrganisation(requestDetails: { firstname: string; lastname: string; email: string; role: string; groups: string[] }, requestOptions: { orgId: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: `organizations/${requestOptions.orgId}/invite_user`,
				body: requestDetails,
				method: 'post'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}

	async searchTeamMembers(requestOptions: { orgId: string; query: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: `organizations/${requestOptions.orgId}/members/search${requestOptions.query}`,
				method: 'get'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}

	async deactivateTeamMember(requestOptions: { orgId: string; memberId: string }) {
		try {
			const response = await this.http.request({
				url: `organizations/${requestOptions.orgId}/members/${requestOptions.memberId}`,
				method: 'delete'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}
}