import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'src/app/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	constructor(private http: HttpService) {}

	async logout(): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: `logout`,
				method: 'delete'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}

	async editBasicInfo(requestDetails: { firstname: string; lastname: string; email: string }, requestOptions: { userId: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: `users/${requestOptions.userId}`,
				body: requestDetails,
				method: 'post'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}
}
