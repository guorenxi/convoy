import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ForgotPasswordComponent
	}
];

@NgModule({
	declarations: [ForgotPasswordComponent],
	imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class ForgotPasswordModule {}
