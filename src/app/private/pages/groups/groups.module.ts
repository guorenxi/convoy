import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: GroupsComponent }];

@NgModule({
	declarations: [GroupsComponent],
	imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class GroupsModule {}
