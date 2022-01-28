import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrganisationComponent } from './create-organisation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [CreateOrganisationComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [CreateOrganisationComponent]
})
export class CreateOrganisationModule {}
