import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewGroupComponent } from './view-group.component';
import { RouterModule } from '@angular/router';
import { LoaderModule } from 'src/app/private/components/loader/loader.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateGroupModule } from '../create-group/create-group.module';
import { ConvoyDashboardModule } from 'convoy-dashboard';

@NgModule({
	declarations: [ViewGroupComponent],
	imports: [
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		CommonModule,
		LoaderModule,
		FormsModule,
		ReactiveFormsModule,
		CreateGroupModule,
		ConvoyDashboardModule,
		RouterModule.forChild([{ path: '', component: ViewGroupComponent }])
	]
})
export class ViewGroupModule {}
