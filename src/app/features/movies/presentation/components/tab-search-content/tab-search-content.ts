import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';
import { Card } from '../card/card';

@Component({
    selector: 'app-tab-search-content',
    imports: [Card],
    template: `
        @let moviesSearch = store.searchMovies();
        @if (store.isLoading()) {
            <div class="tab-search-content__loading">
                <mat-progress-spinner class="tab-search-content__progress" mode="indeterminate"></mat-progress-spinner>
            </div>
        }

        @if (!store.isLoading()) {
            <section class="tab-search-content__grid">
                @for (movie of moviesSearch.results; let index = $index; track index) {
                    <app-card class="tab-search-content__card" [movie]="movie" (movieId)="navigateToMovie($event)"> </app-card>
                } @empty {
                    <p>No movies found</p>
                }
            </section>
        }
    `,
    styleUrl: './tab-search-content.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabSearchContent {
    protected readonly store = inject(MoviesStore);
    readonly #router = inject(Router);

    navigateToMovie(id: number) {
        this.#router.navigate([`/movies/${id}`]);
    }
}
