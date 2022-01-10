import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
	constructor(private router: Router) {}
	canActivate(): boolean {
		const authDetails = localStorage.getItem('CONVOY_AUTH');
		if (authDetails) {
			const { user } = JSON.parse(authDetails);
			const { token } = JSON.parse(authDetails);
			if (user && token) {
				return true;
			}
		}
		this.router.navigate(['/login']);
		return false;
	}
}
