import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from '../models/http.model';
import { HttpService } from '../services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class PrivateService {
	constructor(private http: HttpService) {}

  async getOrganizations(requestOptions: { userId: string }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: `organizations?${requestOptions.userId || ''}`,
				method: 'get'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}

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
