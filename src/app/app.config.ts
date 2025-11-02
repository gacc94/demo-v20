import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
    type ApplicationConfig,
    importProvidersFrom,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';

import { provideAppInitializer } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(() => {
            // inject(MovieStore);
            // inject(movieStoreWithEntity);
        }),
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(
            routes,
            withComponentInputBinding(),
            withViewTransitions({
                skipInitialTransition: true,
            }),
        ),
        importProvidersFrom(),
        provideHttpClient(withFetch(), withInterceptors([apiKeyInterceptor])),
    ],
};
