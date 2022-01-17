import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GeneralService {
	constructor() {}

	showNotification(details: { message: string }) {
		if (!details.message) return;

		const notificationElement = document.querySelector('.app-notification');
		if (notificationElement) {
			notificationElement.classList.add('show');
			notificationElement.innerHTML = details.message;
		}

		setTimeout(() => {
			notificationElement?.classList.remove('show');
		}, 3000);
	}

	onlyNumber(event: KeyboardEvent): boolean {
		const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const ASCII_CODE = Number(event.key);
		if (NUMBERS.includes(ASCII_CODE)) return true;
		return false;
	}

}
