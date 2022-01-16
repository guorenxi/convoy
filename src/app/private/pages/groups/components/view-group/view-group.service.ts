import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'src/app/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class ViewGroupService {
	constructor(private http: HttpService) {}

	async viewGroup(requestOptions: { orgId: string; groupId: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: `groups/${requestOptions.groupId}?${requestOptions.orgId || ''}`,
				method: 'get'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}
}
