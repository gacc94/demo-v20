import { InjectionToken } from '@angular/core';
import type { MovieApiPort } from '../../domain/port/movie-api.port';
import { MovieApi } from '../http/movie-api';

export const MOVIEDB_HTTP = new InjectionToken<MovieApiPort>('MOVIEDB_HTTP', {
	providedIn: 'root',
	factory: () => new MovieApi(),
});

export const MOVIEDB_PROVIDERS = [MOVIEDB_HTTP];
