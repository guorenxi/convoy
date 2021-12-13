import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-accept-invite',
	templateUrl: './accept-invite.component.html',
	styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {
	showPassword: boolean = false;
	acceptInviteForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
		lastName: ['', Validators.required],
		firstName: ['', Validators.required]
	});

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

	acceptInvite(): void {
		console.log(this.acceptInviteForm.value);
	}
}
