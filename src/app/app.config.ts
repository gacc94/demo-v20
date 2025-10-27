import { provideHttpClient, withFetch } from '@angular/common/http';
import {
	type ApplicationConfig,
	importProvidersFrom,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { MoviesStore } from './features/movies/infrastructure/stores/movies.store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(
			routes,
			withComponentInputBinding(),
			withViewTransitions({
				skipInitialTransition: true,
			}),
		),
		importProvidersFrom(MoviesStore),
		provideHttpClient(withFetch()),
	],
};
