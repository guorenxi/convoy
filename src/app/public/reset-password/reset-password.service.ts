import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'convoy-dashboard/lib/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class ResetPasswordService {
	constructor(private http: HttpService) {}

	async resetPassword(requestDetails: { user: { reset_password_token: string; password: string; password_confirmation: string } }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: 'users/password',
				body: requestDetails,
				method: 'put'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}
}
