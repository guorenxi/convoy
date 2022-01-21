import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationSettingsComponent } from './organisation-settings.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [OrganisationSettingsComponent],
	imports: [
		CommonModule,
    ReactiveFormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: OrganisationSettingsComponent
			}
		])
	]
})
export class OrganisationSettingsModule {}
