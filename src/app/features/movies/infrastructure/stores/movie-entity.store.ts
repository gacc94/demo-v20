import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntities, entityConfig, removeAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, type Observable, pipe, switchMap, tap } from 'rxjs';
import type { Credits, Movie } from '../interfaces';
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

export const initialMovieState: MovieState = {
    page: 1,
    results: [],
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

export interface MovieEntityState {
    entities: {
        popular: MovieState;
        topRated: MovieState;
        nowPlaying: MovieState;
        upcoming: MovieState;
        search: MovieState;
        credits: CreditsState;
    };
}

export const initialState: MovieEntityState = {
    entities: {
        popular: structuredClone(initialMovieState),
        topRated: structuredClone(initialMovieState),
        nowPlaying: structuredClone(initialMovieState),
        upcoming: structuredClone(initialMovieState),
        search: structuredClone(initialMovieState),
        credits: structuredClone(initialCreditsState),
    },
};

const popularConfig = entityConfig({
    entity: type<Movie>(),
    collection: 'popular',
});

const topRatedConfig = entityConfig({
    entity: type<Movie>(),
    collection: 'topRated',
});

const nowPlayingConfig = entityConfig({
    entity: type<Movie>(),
    collection: 'nowPlaying',
});

const upcomingConfig = entityConfig({
    entity: type<Movie>(),
    collection: 'upcoming',
});

const searchConfig = entityConfig({
    entity: type<Movie>(),
    collection: 'search',
});

const creditsConfig = entityConfig({
    entity: type<Credits>(),
    collection: 'credits',
});

export const movieStoreWithEntity = signalStore(
    { providedIn: 'root' },
    withDevtools('MovieStoreEntities'),

    withEntities(popularConfig),
    withEntities(topRatedConfig),
    withEntities(nowPlayingConfig),
    withEntities(upcomingConfig),
    withEntities(searchConfig),
    withEntities(creditsConfig),

    withState(initialState),
    withMethods((store, _service = inject(MOVIEDB_HTTP)) => ({
        loadPopular: rxMethod<number>(
            pipe(
                tap(() => {
                    patchState(store, {
                        entities: {
                            ...store.entities(),
                            popular: {
                                ...store.entities().popular,
                                isLoading: true,
                            },
                        },
                    });
                }),
                switchMap((page) => {
                    return _service.getPopularsPage(page).pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(store, addEntities(response.results, popularConfig));
                                patchState(store, {
                                    entities: {
                                        ...store.entities(),
                                        popular: {
                                            ...store.entities().popular,
                                            ...store.popularEntities(),
                                            page: page + 1,
                                            isLoading: false,
                                        },
                                    },
                                });
                            },
                            error: () => {},
                            complete: () => {},
                        }),
                    );
                }),
            ),
        ),
    })),

    withHooks((store) => ({
        onInit: () => {
            store.loadPopular(store.entities.popular.page());
        },
    })),
);

// *============================================
// * INTERFACES Y TIPOS
// *============================================

// Metadata para paginación y loading states
export interface CollectionMetadata {
    page: number;
    totalPages: number;
    totalResults: number;
    isLoading: boolean;
    error: string | null;
}

// Estado específico para créditos
export interface CreditsMetadata {
    movieId: number | null;
    isLoading: boolean;
    error: string | null;
}

// ============================================
// ESTADO INICIAL
// ============================================

const createInitialMetadata = (): CollectionMetadata => ({
    page: 1,
    totalPages: 0,
    totalResults: 0,
    isLoading: false,
    error: null,
});

const createInitialCreditsMetadata = (): CreditsMetadata => ({
    movieId: null,
    isLoading: false,
    error: null,
});

// ============================================
// CONFIGURACIONES DE ENTIDADES
// ============================================

// Tipos de colecciones de películas
type MovieCollection = 'popular' | 'topRated' | 'nowPlaying' | 'upcoming' | 'search';

// Configuraciones de entidades por colección
const MOVIE_ENTITY_CONFIGS = {
    popular: entityConfig({
        entity: type<Movie>(),
        collection: 'popular',
        selectId: (movie: Movie) => movie.id,
    }),
    topRated: entityConfig({
        entity: type<Movie>(),
        collection: 'topRated',
        selectId: (movie: Movie) => movie.id,
    }),
    nowPlaying: entityConfig({
        entity: type<Movie>(),
        collection: 'nowPlaying',
        selectId: (movie: Movie) => movie.id,
    }),
    upcoming: entityConfig({
        entity: type<Movie>(),
        collection: 'upcoming',
        selectId: (movie: Movie) => movie.id,
    }),
    search: entityConfig({
        entity: type<Movie>(),
        collection: 'search',
        selectId: (movie: Movie) => movie.id,
    }),
};

const CREDITS_ENTITY_CONFIG = entityConfig({
    entity: type<Credits>(),
    collection: 'credits',
    selectId: (credit: Credits) => credit.id,
});

// ============================================
// SIGNAL STORE
// ============================================

export const MovieStore = signalStore(
    { providedIn: 'root' },

    withDevtools('MovieStoreEntities2'),

    withEntities(MOVIE_ENTITY_CONFIGS.popular),
    withEntities(MOVIE_ENTITY_CONFIGS.topRated),
    withEntities(MOVIE_ENTITY_CONFIGS.nowPlaying),
    withEntities(MOVIE_ENTITY_CONFIGS.upcoming),
    withEntities(MOVIE_ENTITY_CONFIGS.search),
    // Configurar todas las entidades
    withEntities(CREDITS_ENTITY_CONFIG),

    // Estado adicional para metadata de cada colección
    withState({
        metadata: {
            popular: createInitialMetadata(),
            topRated: createInitialMetadata(),
            nowPlaying: createInitialMetadata(),
            upcoming: createInitialMetadata(),
            search: createInitialMetadata(),
            credits: createInitialCreditsMetadata(),
        },
    }),

    // ============================================
    // COMPUTED SIGNALS (Selectores)
    // ============================================
    withComputed((store) => ({
        // Estado de carga general
        isAnyLoading: computed(() => Object.values(store.metadata()).some((meta) => meta.isLoading)),

        // Películas populares con metadata
        popularMoviesView: computed(() => ({
            movies: store.popularEntities(),
            ...store.metadata.popular(),
        })),

        // Top rated con metadata
        topRatedMoviesView: computed(() => ({
            movies: store.topRatedEntities(),
            ...store.metadata.topRated(),
        })),

        // Now playing con metadata
        nowPlayingMoviesView: computed(() => ({
            movies: store.nowPlayingEntities(),
            ...store.metadata.nowPlaying(),
        })),

        // Upcoming con metadata
        upcomingMoviesView: computed(() => ({
            movies: store.upcomingEntities(),
            ...store.metadata.upcoming(),
        })),

        // Búsqueda con metadata
        searchResultsView: computed(() => ({
            movies: store.searchEntities(),
            ...store.metadata.search(),
        })),

        // Créditos con metadata
        // creditsView: computed(() => ({
        //     cast: store.creditsEntities().filter((c) => c.type === 'cast'),
        //     crew: store.creditsEntities().filter((c) => c.type === 'crew'),
        //     ...store.metadata.credits(),
        // })),
    })),

    // ============================================
    // MÉTODOS
    // ============================================
    withMethods((store, movieService = inject(MOVIEDB_HTTP)) => {
        // Helper para actualizar metadata de una colección
        const updateCollectionMetadata = (collection: MovieCollection, updates: Partial<CollectionMetadata>) => {
            patchState(store, {
                metadata: {
                    ...store.metadata(),
                    [collection]: {
                        ...store.metadata()[collection],
                        ...updates,
                    },
                },
            });
        };

        // Helper para actualizar metadata de créditos
        const updateCreditsMetadata = (updates: Partial<CreditsMetadata>) => {
            patchState(store, {
                metadata: {
                    ...store.metadata(),
                    credits: {
                        ...store.metadata().credits,
                        ...updates,
                    },
                },
            });
        };

        // Factory para crear métodos de carga genéricos
        const createLoadMethod = (collection: MovieCollection, serviceMethod: (page: number) => Observable<MovieResponse>) => {
            return rxMethod<number>(
                pipe(
                    tap(() => updateCollectionMetadata(collection, { isLoading: true, error: null })),
                    switchMap((page) =>
                        serviceMethod(page).pipe(
                            tapResponse({
                                next: (response) => {
                                    // Agregar películas a la entidad
                                    patchState(store, addEntities(response.results, MOVIE_ENTITY_CONFIGS[collection]));

                                    // Actualizar metadata
                                    updateCollectionMetadata(collection, {
                                        page: response.page,
                                        totalPages: response.total_pages,
                                        totalResults: response.total_results,
                                        isLoading: false,
                                    });
                                },
                                error: (error: Error) => {
                                    updateCollectionMetadata(collection, {
                                        isLoading: false,
                                        error: error.message,
                                    });
                                },
                            }),
                        ),
                    ),
                ),
            );
        };

        return {
            // Métodos de carga para cada colección
            loadPopular: createLoadMethod('popular', (page) => movieService.getPopularsPage(page)),

            loadTopRated: createLoadMethod('topRated', (page) => movieService.getTopRated(page)),

            loadNowPlaying: createLoadMethod('nowPlaying', (page) => movieService.getNowPlaying(page)),

            loadUpcoming: createLoadMethod('upcoming', (page) => movieService.getUpcoming(page)),

            // Método de búsqueda
            searchMovies: rxMethod<{ query: string; page: number }>(
                pipe(
                    tap(() => updateCollectionMetadata('search', { isLoading: true, error: null })),
                    debounceTime(300),
                    switchMap(({ query, page }) =>
                        movieService.searchMovies(query, page).pipe(
                            tapResponse({
                                next: (response) => {
                                    // Limpiar resultados anteriores en nueva búsqueda
                                    if (page === 1) {
                                        patchState(store, removeAllEntities(MOVIE_ENTITY_CONFIGS.search));
                                    }

                                    patchState(store, addEntities(response.results, MOVIE_ENTITY_CONFIGS.search));

                                    updateCollectionMetadata('search', {
                                        page: response.page,
                                        totalPages: response.total_pages,
                                        totalResults: response.total_results,
                                        isLoading: false,
                                    });
                                },
                                error: (error: Error) => {
                                    updateCollectionMetadata('search', {
                                        isLoading: false,
                                        error: error.message,
                                    });
                                },
                            }),
                        ),
                    ),
                ),
            ),

            // Cargar créditos de una película
            // loadCredits: rxMethod<number>(
            //     pipe(
            //         tap(() => updateCreditsMetadata({ isLoading: true, error: null })),
            //         switchMap((movieId) =>
            //             movieService.getMovieCredits(movieId).pipe(
            //                 tapResponse({
            //                     next: (response) => {
            //                         // Limpiar créditos anteriores
            //                         patchState(store, removeAllEntities(CREDITS_ENTITY_CONFIG));

            //                         // Agregar nuevos créditos (cast + crew)
            //                         const allCredits = [
            //                             ...response.cast.map((c) => ({ ...c, type: 'cast' })),
            //                             ...response.crew.map((c) => ({ ...c, type: 'crew' })),
            //                         ];

            //                         patchState(store, addEntities(allCredits, CREDITS_ENTITY_CONFIG));

            //                         updateCreditsMetadata({
            //                             movieId,
            //                             isLoading: false,
            //                         });
            //                     },
            //                     error: (error: Error) => {
            //                         updateCreditsMetadata({
            //                             isLoading: false,
            //                             error: error.message,
            //                         });
            //                     },
            //                 }),
            //             ),
            //         ),
            //     ),
            // ),

            // // Cargar siguiente página de una colección
            // loadNextPage: (collection: MovieCollection) => {
            //     const metadata = store.metadata()[collection];
            //     const currentPage = metadata.page;

            //     if (currentPage < metadata.totalPages && !metadata.isLoading) {
            //         const loadMethods = {
            //             popular: store.loadPopular,
            //             topRated: store.loadTopRated,
            //             nowPlaying: store.loadNowPlaying,
            //             upcoming: store.loadUpcoming,
            //             search: store.searchMovies,
            //         };

            //         loadMethods[collection](currentPage + 1);
            //     }
            // },

            // Limpiar búsqueda
            clearSearch: () => {
                patchState(store, removeAllEntities(MOVIE_ENTITY_CONFIGS.search));
                updateCollectionMetadata('search', createInitialMetadata());
            },

            // Limpiar créditos
            clearCredits: () => {
                patchState(store, removeAllEntities(CREDITS_ENTITY_CONFIG));
                updateCreditsMetadata(createInitialCreditsMetadata());
            },
        };
    }),

    // ============================================
    // HOOKS DE INICIALIZACIÓN
    // ============================================
    withHooks({
        onInit: (store) => {
            // Cargar películas populares al inicializar
            store.loadPopular(1);
        },
    }),
);

// ============================================
// TIPOS DE RESPUESTA DEL SERVICIO
// ============================================

interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
