import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, delay, distinctUntilChanged, forkJoin, of, pipe, switchMap, tap } from 'rxjs';

import { FormControl } from '@angular/forms';
import type { Credits } from '../interfaces/credits.interface';
import type { Movie, MovieResponse } from '../interfaces/movie.interface';
import { MOVIEDB_HTTP } from '../providers/movie.provider';

export interface MovieState {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
    isLoading: boolean;
    error: Error | null;
}

export interface CreditsState {
    id: number | null;
    cast: Credits[];
    crew: Credits[];
    isLoading: boolean;
    error: Error | null;
}

interface InitialState {
    isLoading: boolean;
    popularMovies: MovieState;
    searchMovies: MovieState;
    topReated: MovieState;
    nowPlaying: MovieState;
    upcoming: MovieState;
    page: number; //!TODO: Remove this
    error: string | null | Error; //!TODO: Remove this
    movie: Movie | null;
    isLoadingMovie: boolean; //!TODO: Remove this
    movieId: number | null; //!TODO: Remove this
    credits: CreditsState | null;
}

const initialMovieState: MovieState = {
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    isLoading: false,
    error: null,
};

const initialCreditsState: CreditsState = {
    id: null,
    cast: [],
    crew: [],
    isLoading: false,
    error: null,
};

const initialState: InitialState = {
    isLoading: false,
    popularMovies: structuredClone(initialMovieState),
    searchMovies: structuredClone(initialMovieState),
    topReated: structuredClone(initialMovieState),
    nowPlaying: structuredClone(initialMovieState),
    upcoming: structuredClone(initialMovieState),
    credits: structuredClone(initialCreditsState),
    page: 1,
    error: null,
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
    withComputed(() => ({})),
    withMethods((store) => ({
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

        loadTopRated: rxMethod<number>(
            pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(() => patchState(store, { topReated: { ...store.topReated(), isLoading: true } })),
                switchMap((page) => {
                    return store._movieApi.getTopRated(page).pipe(
                        tapResponse({
                            next: (movieTopRated: MovieResponse) =>
                                patchState(store, {
                                    topReated: {
                                        ...store.topReated(),
                                        ...movieTopRated,
                                        results: store.topReated().results.concat(movieTopRated.results),
                                        page: page + 1,
                                    },
                                }),
                            error: (error: Error) => patchState(store, { topReated: { ...store.topReated(), error } }),
                            complete: () => patchState(store, { topReated: { ...store.topReated(), isLoading: false } }),
                        }),
                    );
                }),
            ),
        ),

        loadNowPlaying: rxMethod<number>(
            pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(() => patchState(store, { nowPlaying: { ...store.nowPlaying(), isLoading: true } })),
                switchMap((page) => {
                    return store._movieApi.getNowPlaying(page).pipe(
                        tapResponse({
                            next: (movieNowPlaying: MovieResponse) =>
                                patchState(store, {
                                    nowPlaying: {
                                        ...store.nowPlaying(),
                                        ...movieNowPlaying,
                                        results: store.nowPlaying().results.concat(movieNowPlaying.results),
                                        page: page + 1,
                                    },
                                }),
                            error: (error: Error) => patchState(store, { nowPlaying: { ...store.nowPlaying(), error } }),
                            complete: () => patchState(store, { nowPlaying: { ...store.nowPlaying(), isLoading: false } }),
                        }),
                    );
                }),
            ),
        ),

        loadUpcoming: rxMethod<number>(
            pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(() => patchState(store, { upcoming: { ...store.upcoming(), isLoading: true } })),
                switchMap((page) => {
                    return store._movieApi.getUpcoming(page).pipe(
                        tapResponse({
                            next: (movieUpcoming: MovieResponse) =>
                                patchState(store, {
                                    upcoming: {
                                        ...store.upcoming(),
                                        ...movieUpcoming,
                                        results: store.upcoming().results.concat(movieUpcoming.results),
                                        page: page + 1,
                                    },
                                }),
                            error: (error: Error) => patchState(store, { upcoming: { ...store.upcoming(), error } }),
                            complete: () => patchState(store, { upcoming: { ...store.upcoming(), isLoading: false } }),
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
                        return store._movieApi.searchMovies(value, 1).pipe(
                            delay(2000),
                            tapResponse({
                                next: (searchMoviesRes) =>
                                    patchState(store, {
                                        searchMovies: { ...searchMoviesRes, isLoading: false, error: null },
                                    }),
                                error: (error: Error) => patchState(store, { error }),
                                complete: () => patchState(store, { isLoading: false }),
                            }),
                        );
                    }),
                )
                .subscribe();
        },

        loadMovieDetail: rxMethod<number>(
            pipe(
                tap(() =>
                    patchState(store, {
                        isLoadingMovie: true,
                        error: null,
                        movie: null,
                        credits: null,
                    }),
                ),
                delay(2000),
                switchMap((id: number) => {
                    return forkJoin({
                        movie: store._movieApi.getMovieByIdHttp(id),
                        credits: store._movieApi.getCredits(id),
                    }).pipe(
                        tapResponse({
                            next: ({ movie, credits }) => {
                                patchState(store, {
                                    movie: { ...movie },
                                    credits: { ...credits, isLoading: false, error: null },
                                });
                            },
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
            store.loadTopRated(store.topReated.page());
            store.loadNowPlaying(store.nowPlaying.page());
            store.loadUpcoming(store.upcoming.page());
            store._searchMovies();
        },
        onDestroy: () => {
            console.log('destroy');
            store.loadPopularsPage.destroy();
            store.loadTopRated.destroy();
            store.loadNowPlaying.destroy();
            store.loadUpcoming.destroy();
            store.loadMovieDetail.destroy();
        },
    })),
);
