import { Skeleton } from '@/app/shared/directives/skeleton';
import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';
import { Card } from '../card/card';

@Component({
    selector: 'app-tab-search-content',
    imports: [Card, MaterialModule, Skeleton],
    template: `
        @let moviesSearch = store.searchMovies();

        @if (moviesSearch.isLoading) {
            <div class="tab-search-content__grid">
                @for (card of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track card) {
                    <div class="tab-search-content__card">
                        <div
                            skeleton
                            [isLoading]="true"
                            [skeletonHeight]="'18rem'"
                            [skeletonWidth]="'100%'"
                            style="margin-bottom: 1rem"
                        ></div>
                        <div skeleton [isLoading]="true" [skeletonHeight]="'2rem'" [skeletonWidth]="'100%'"></div>
                    </div>
                }
            </div>
        }

        @if (!moviesSearch.isLoading) {
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
})
export class TabSearchContent {
    protected readonly store = inject(MoviesStore);
    readonly #router = inject(Router);

    navigateToMovie(id: number) {
        this.#router.navigate([`/movies/${id}`]);
    }
}
