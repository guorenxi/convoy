import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'src/app/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class AcceptInviteService {
	constructor(private http: HttpService) {}

	async acceptInvite(requestDetails: { firstname: string; lastname: string; email: string; role: string; password: string; token: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: 'users/accept_invite',
				body: requestDetails,
				method: 'put'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}
}
