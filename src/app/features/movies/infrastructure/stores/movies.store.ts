import { withDevtools, withSessionStorage, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, delay, distinctUntilChanged, forkJoin, of, pipe, switchMap, tap } from 'rxjs';

import { FormControl } from '@angular/forms';
import type { Credits } from '../interfaces/credits.interface';
import type { Movie, MovieResponse } from '../interfaces/movie.interface';
import { MOVIEDB_HTTP } from '../providers/movie.provider';
import { StoreService } from '../services/store.service';

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

export interface InitialState {
    isLoading: boolean;
    popular: MovieState;
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
    selectedTabIndex: number;
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

export const initialState: InitialState = {
    isLoading: false,
    popular: structuredClone(initialMovieState),
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
    selectedTabIndex: 0,
};

export const MoviesStore = signalStore(
    // { providedIn: 'platform' },
    withDevtools('MoviesStore'), // @TODO: only development
    withState<InitialState>(initialState), // @TODO: WatchState use in initial state
    withProps(() => ({
        _movieApi: inject(MOVIEDB_HTTP),
        _storeService: inject(StoreService),
        searchControl: new FormControl<string | null>(''),
    })),
    withStorageSync(
        {
            key: 'popular',
            select: (state: InitialState) => state.popular,
        },
        withSessionStorage(),
    ),
    withStorageSync(
        {
            key: 'topReated',
            select: (state: InitialState) => state.topReated,
        },
        withSessionStorage(),
    ),
    withStorageSync(
        {
            key: 'nowPlaying',
            select: (state: InitialState) => state.nowPlaying,
        },
        withSessionStorage(),
    ),
    withStorageSync(
        {
            key: 'upcoming',
            select: (state: InitialState) => state.upcoming,
        },
        withSessionStorage(),
    ),
    withComputed(() => ({})), //TODO: WithComputed use in computed
    withMethods((store, _service = inject(MOVIEDB_HTTP)) => ({
        loadPopular: store._storeService.loadPopularFn(store),

        loadTopRated: rxMethod<number>(
            pipe(
                tap(() =>
                    patchState(store, {
                        topReated: { ...store.topReated(), isLoading: true },
                    }),
                ),
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
                            error: (error: Error) =>
                                patchState(store, {
                                    topReated: { ...store.topReated(), error },
                                }),
                            complete: () =>
                                patchState(store, {
                                    topReated: { ...store.topReated(), isLoading: false },
                                }),
                        }),
                    );
                }),
            ),
        ),

        loadNowPlaying: rxMethod<number>(
            pipe(
                tap(() =>
                    patchState(store, {
                        nowPlaying: { ...store.nowPlaying(), isLoading: true },
                    }),
                ),
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
                            error: (error: Error) =>
                                patchState(store, {
                                    nowPlaying: { ...store.nowPlaying(), error },
                                }),
                            complete: () =>
                                patchState(store, {
                                    nowPlaying: { ...store.nowPlaying(), isLoading: false },
                                }),
                        }),
                    );
                }),
            ),
        ),

        loadUpcoming: rxMethod<number>(
            pipe(
                tap(() =>
                    patchState(store, {
                        upcoming: { ...store.upcoming(), isLoading: true },
                    }),
                ),
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
                            error: (error: Error) =>
                                patchState(store, {
                                    upcoming: { ...store.upcoming(), error },
                                }),
                            complete: () =>
                                patchState(store, {
                                    upcoming: { ...store.upcoming(), isLoading: false },
                                }),
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
                    tap(() => {
                        patchState(store, {
                            searchMovies: { ...store.searchMovies(), isLoading: true },
                            selectedTabIndex: 1,
                        });
                    }),
                    switchMap((value) => {
                        if (!value) {
                            patchState(store, {
                                searchMovies: { ...store.searchMovies(), isLoading: false, results: [] },
                            });
                            return of(null);
                        }
                        return store._movieApi.searchMovies(value, 1).pipe(
                            delay(2000),
                            tapResponse({
                                next: (searchMoviesRes) =>
                                    patchState(store, {
                                        searchMovies: {
                                            ...searchMoviesRes,
                                            isLoading: false,
                                            error: null,
                                        },
                                    }),
                                error: (error: Error) =>
                                    patchState(store, {
                                        searchMovies: { ...store.searchMovies(), error },
                                    }),
                                complete: () =>
                                    patchState(store, {
                                        searchMovies: { ...store.searchMovies(), isLoading: false },
                                    }),
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
                                    movie: structuredClone(movie),
                                    credits: { ...structuredClone(credits), isLoading: false, error: null },
                                });
                            },
                            error: (error: Error) =>
                                patchState(store, {
                                    error,
                                    isLoadingMovie: false,
                                }),
                            complete: () => patchState(store, { isLoadingMovie: false }),
                        }),
                    );
                }),
            ),
        ),

        setSelectedTabIndex: rxMethod<number>(pipe(tap((index) => patchState(store, { selectedTabIndex: index })))),

        clearMovie: () => patchState(store, { movie: null, isLoadingMovie: false }),

        clearStorage: () => {
            store.clearStorage();
        },
    })),
    withHooks((store) => ({
        onInit: () => {
            console.log('inti store');
            // store.loadPopular(store.popular.page());
            // store.loadTopRated(store.topReated.page());
            // store.loadNowPlaying(store.nowPlaying.page());
            // store.loadUpcoming(store.upcoming.page());
            store._searchMovies();
        },
        onDestroy: () => {
            console.log('destroy store');
            store.loadPopular.destroy();
            store.loadTopRated.destroy();
            store.loadNowPlaying.destroy();
            store.loadUpcoming.destroy();
            store.loadMovieDetail.destroy();
        },
    })),
);
