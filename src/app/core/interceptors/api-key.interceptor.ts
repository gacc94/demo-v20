import { environment } from '@/environments/environment.dev';
import type { HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';

export const API_KEY_TOKEN = new InjectionToken<string>('API_KEY', {
	providedIn: 'root',
	factory: () => environment.apis.moviedb.apiKey,
});

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
	const apiKey = inject(API_KEY_TOKEN);

	if (!apiKey) {
		return next(req);
	}

	const clonedRequest = req.clone({
		setHeaders: {
			Authorization: `Bearer ${apiKey}`,
		},
	});

	return next(clonedRequest);
};
