import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';

const routes: Routes = [
	{
		path: '',
		component: PrivateComponent,
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'projects',
				loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule)
			},
			{
				path: 'team',
				loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule)
			},
			{
				path: 'user-settings',
				loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
			},
			{
				path: 'organisation-settings',
				loadChildren: () => import('./pages/organisation-settings/organisation-settings.module').then(m => m.OrganisationSettingsModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PrivateRoutingModule {}
