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
				path: 'groups',
				loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule)
			},
			{
				path: 'team',
				loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule)
			},
			{
				path: 'account',
				loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PrivateRoutingModule {}
