import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { AcceptInviteService } from './accept-invite.service';

@Component({
	selector: 'app-accept-invite',
	templateUrl: './accept-invite.component.html',
	styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {
	showPassword: boolean = false;
	loading: boolean = false;
	token!: string;
	acceptInviteForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required],
		role: ['', Validators.required],
		password: ['', Validators.required],
		lastname: ['', Validators.required],
		firstname: ['', Validators.required],
		token: ['']
	});

	constructor(private formBuilder: FormBuilder, private acceptInviteService: AcceptInviteService, private route: ActivatedRoute, private router: Router, private generalService: GeneralService) {}

	ngOnInit() {
		this.getToken();
	}

	getToken() {
		this.route.queryParams.subscribe(res => {
			this.token = res.token;
		});
	}

	async acceptInvite() {
		if (this.acceptInviteForm.invalid) {
			(<any>this.acceptInviteForm).values(this.acceptInviteForm.controls).forEach((control: FormControl) => {
				control?.markAsTouched();
			});
			return;
		}
		this.acceptInviteForm.patchValue({
			token: this.token
		});
		this.loading = true;
		try {
			const response = await this.acceptInviteService.acceptInvite(this.acceptInviteForm.value);
			this.loading = false;
			if (response.data) this.router.navigateByUrl('login');
			this.generalService.showNotification({ message: response.message });
		} catch {
			this.loading = false;
		}
	}
}
