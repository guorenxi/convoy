import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptInviteComponent } from './accept-invite.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: AcceptInviteComponent
	}
];

@NgModule({
	declarations: [AcceptInviteComponent],
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule]
})
export class AcceptInviteModule {}
