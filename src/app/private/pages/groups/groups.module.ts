import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../components/loader/loader.module';
import { CreateGroupModule } from './components/create-group/create-group.module';

const routes: Routes = [
	{ path: '', component: GroupsComponent },
	{
		path: ':id',
		loadChildren: () => import('./components/view-group/view-group.module').then(m => m.ViewGroupModule)
	}
];

@NgModule({
	declarations: [GroupsComponent],
	imports: [CommonModule, ReactiveFormsModule, LoaderModule, CreateGroupModule, RouterModule.forChild(routes)]
})
export class GroupsModule {}
