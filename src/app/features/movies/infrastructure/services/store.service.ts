import { inject, Injectable, Signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, WritableStateSource } from '@ngrx/signals';
import { RxMethod, rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { MovieResponse } from '../interfaces';
import { MOVIEDB_HTTP } from '../providers/movie.provider';
import { InitialState } from '../stores/movies.store';

type SignalState<T> = {
    [K in keyof T]: Signal<T[K]>;
};

export interface StateStore extends WritableStateSource<InitialState>, SignalState<InitialState> {}

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    readonly #service = inject(MOVIEDB_HTTP);

    loadPopularFn(store: StateStore): RxMethod<number> {
        return rxMethod<number>(
            pipe(
                tap(() =>
                    patchState(store, {
                        popular: { ...store.popular(), isLoading: true },
                    }),
                ),
                switchMap((page) => {
                    return this.#service.getPopularsPage(page).pipe(
                        tapResponse({
                            next: (moviePopular: MovieResponse) =>
                                patchState(store, {
                                    popular: {
                                        ...store.popular(),
                                        ...moviePopular,
                                        results: store.popular().results.concat(moviePopular.results),
                                        page: page + 1,
                                    },
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    popular: { ...store.popular(), error },
                                }),
                            complete: () =>
                                patchState(store, {
                                    popular: { ...store.popular(), isLoading: false },
                                }),
                        }),
                    );
                }),
            ),
        );
    }
}
