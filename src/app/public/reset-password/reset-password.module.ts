import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ResetPasswordComponent
	}
];

@NgModule({
	declarations: [ResetPasswordComponent],
	imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class ResetPasswordModule {}
