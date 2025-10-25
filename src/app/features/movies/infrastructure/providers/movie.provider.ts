import { InjectionToken } from '@angular/core';
import { MovieApi } from '../http/movie-api';

export const MOVIEDB_HTTP = new InjectionToken('MOVIEDB_HTTP', {
	providedIn: 'root',
	factory: () => new MovieApi(),
});

export const MOVIEDB_PROVIDERS = [MOVIEDB_HTTP];
