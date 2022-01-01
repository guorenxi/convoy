import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/public/login/login.service';

@Component({
	selector: 'app-create-organisation',
	templateUrl: './create-organisation.component.html',
	styleUrls: ['./create-organisation.component.scss']
})
export class CreateOrganisationComponent implements OnInit {
	@Output() closeModal = new EventEmitter();
	addOrganisationForm: FormGroup = this.formBuilder.group({
		name: ['', Validators.required]
	});
	constructor(private loginService: LoginService, private formBuilder: FormBuilder) {}

	ngOnInit(): void {}

	close() {
		this.closeModal.emit();
	}

	addNewOrganisation() {}
}
