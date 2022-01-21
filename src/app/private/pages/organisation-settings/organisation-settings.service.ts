import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'src/app/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class OrganisationSettingsService {
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
}
