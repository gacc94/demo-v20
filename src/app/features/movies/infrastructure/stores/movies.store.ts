import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, delay, distinctUntilChanged, of, pipe, switchMap, tap } from 'rxjs';

import { FormControl } from '@angular/forms';
import type { Movie, MovieResponse } from '../interfaces/movie.interface';
import { MOVIEDB_HTTP } from '../providers/movie.provider';

interface InitialState {
	isLoading: boolean;
	popularMovies: MovieResponse;
	page: number;
	error: string | null | Error;
	searchMovies: MovieResponse;
	movie: Movie | null;
	isLoadingMovie: boolean;
	movieId: number | null;
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
	searchMovies: {
		results: [],
		page: 0,
		total_pages: 0,
		total_results: 0,
	},
	movie: null,
	isLoadingMovie: false,
	movieId: null,
};

export const MoviesStore = signalStore(
	{ providedIn: 'root' },
	withState<InitialState>(initialState),
	withProps(() => ({
		_movieApi: inject(MOVIEDB_HTTP),
		searchControl: new FormControl<string | null>(''),
	})),
	withComputed((store) => ({
		movies: () => store.popularMovies().results,
	})),
	withMethods((store) => ({
		movieById: (id: number) => store.movies().find((movie: Movie) => movie.id.toString() === id.toString()),
		/**
		 * *Load popular movies
		 */
		loadPopularsPage: rxMethod(
			pipe(
				debounceTime(500),
				distinctUntilChanged(),
				tap(() => patchState(store, { isLoading: true })),
				switchMap(() => {
					return store._movieApi.getPopularsPage(store.page()).pipe(
						tapResponse({
							next: (moviePopular: MovieResponse) =>
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
		_searchMovies: () => {
			store.searchControl.valueChanges
				.pipe(
					debounceTime(1000),
					distinctUntilChanged(),
					tap(() => patchState(store, { isLoading: true })),
					switchMap((value) => {
						if (!value) {
							patchState(store, { searchMovies: { ...store.searchMovies() }, isLoading: false });
							return of(null);
						}
						return store._movieApi.searchMovies(value).pipe(
							delay(2000),
							tapResponse({
								next: (searchMoviesRes: MovieResponse) =>
									patchState(store, {
										searchMovies: { ...searchMoviesRes },
									}),
								error: (error: Error) => patchState(store, { error }),
								complete: () => patchState(store, { isLoading: false }),
							}),
						);
					}),
				)
				.subscribe();
		},

		loadMovieById: rxMethod<number>(
			pipe(
				tap(() => patchState(store, { isLoadingMovie: true })),
				delay(500),
				switchMap((id: number) => {
					return store._movieApi.getMovieByIdHttp(id).pipe(
						tapResponse({
							next: (movie: Movie) => patchState(store, { movie }),
							error: (error: Error) => patchState(store, { error }),
							complete: () => patchState(store, { isLoadingMovie: false }),
						}),
					);
				}),
			),
		),
		clearMovie: () => patchState(store, { movie: null, isLoadingMovie: false }),
	})),
	withHooks((store) => ({
		onInit: () => {
			store.loadPopularsPage(store.page());
			store._searchMovies();
		},
		onDestroy: () => {
			console.log('destroy');
			store.loadPopularsPage.destroy();
		},
	})),
);
