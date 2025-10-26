import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';

import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

import { withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { FormControl } from '@angular/forms';
import type { Movie, MoviePopular } from '../interfaces/movie.interface';
import { MOVIEDB_HTTP } from '../providers/movie.provider';

interface InitialState {
	isLoading: boolean;
	popularMovies: MoviePopular;
	page: number;
	error: string | null | Error;
    searchControl: FormControl<string | null>;
}

const initialState: InitialState = {
	isLoading: false,
	popularMovies: {
		results: [],
		page: 0,
		total_pages: 0,
		total_results: 0,
	},
	page: 1,
	error: null,
    searchControl: new FormControl<string>('', ),
};

export interface Podcast {
	id: string;
	title: string;
	author: string;
}

// 3. Definir el estado inicial

// 4. Crear el store con withState y withEntities
export const PodcastStore = signalStore({ providedIn: 'root' }, withState(initialState), withEntities<Podcast>());

export const MoviesStore = signalStore(
	{ providedIn: 'root' },
	withState<InitialState>(() => initialState),
	withProps(() => ({
		_movieApi: inject(MOVIEDB_HTTP),
	})),
	withComputed((store) => ({
		movies: () => store.popularMovies().results,
	})),

	withMethods((store) => ({
		movieById: (id: number) => store.movies().find((movie: Movie) => movie.id.toString() === id.toString()),
		loadPopularsPage: rxMethod(
			pipe(
				debounceTime(500),
				distinctUntilChanged(),
				tap(() => patchState(store, { isLoading: true })),
				switchMap(() => {
					return store._movieApi.getPopularsPage(store.page()).pipe(
						tapResponse({
							next: (moviePopular: MoviePopular) =>
								patchState(store, {
									popularMovies: {
										...store.popularMovies(),
										...moviePopular,
										results: store.popularMovies().results.concat(moviePopular.results),
									},
									page: store.page() + 1,
								}),
							error: (error: Error) => patchState(store, { error }),
							complete: () => patchState(store, { isLoading: false }),
						}),
					);
				}),
			),
		),
	})),
	withHooks((store) => ({
		onInit: () => {
			store.loadPopularsPage(store.page());
		},
		onDestroy: () => {
			console.log('destroy');
			store.loadPopularsPage.destroy();
		},
	})),
);
