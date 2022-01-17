import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
		canActivate: [AuthGuardGuard]
	},
	{
		path: 'login',
		loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'signup',
		loadChildren: () => import('./public/signup/signup.module').then(m => m.SignupModule)
	},
	{
		path: 'forgot-password',
		loadChildren: () => import('./public/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
	},
	{
		path: 'reset-password',
		loadChildren: () => import('./public/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
	},
	{
		path: 'accept-invite',
		loadChildren: () => import('./public/accept-invite/accept-invite.module').then(m => m.AcceptInviteModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
