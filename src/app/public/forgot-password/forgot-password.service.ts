import { Injectable } from '@angular/core';
import { HTTP_RESPONSE } from 'convoy-dashboard/lib/models/http.model';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http:HttpService) { }


	async forgotPassword(requestDetails: { user: { email: string } }): Promise<HTTP_RESPONSE> {
		try {
			const response = await this.http.request({
				url: 'users/password',
				body: requestDetails,
				method: 'post'
			});
			return response;
		} catch (error: any) {
			return error;
		}
	}
}
