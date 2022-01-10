import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'src/app/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class SignupService {
	constructor(private http: HttpService) {}

	async signup(requestDetails: { firstname: string; lastname: string; email: string; password: string; org_name: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: 'users',
				body: requestDetails,
				method: 'post'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}
}
