import { Skeleton } from '@/app/shared/directives/skeleton';
import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';
import { Carrousel } from '../carrousel/carrousel';

@Component({
    selector: 'app-tab-movies-content',
    imports: [MaterialModule, Carrousel, ImagePosterPipe, Skeleton],
    template: `
        @let moviesPopulars = store.popular();
        @let moviesTopRated = store.topReated();
        @let moviesNowPlaying = store.nowPlaying();
        @let moviesUpcoming = store.upcoming();

        <section class="movies__swiper">
            <h2 class="movies__swiper-title"><mat-icon class="" matSuffix>arrow_forward</mat-icon> Popular Movies</h2>
            @if (moviesPopulars.isLoading) {
                <app-carrousel>
                    @for (credit of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track $index) {
                        <swiper-slide class="swiper-slide">
                            <div
                                skeleton
                                [isLoading]="true"
                                [skeletonType]="'wave'"
                                [skeletonLines]="2"
                                [skeletonHeight]="'15rem'"
                                [skeletonWidth]="'100%'"
                                [skeletonBorderRadius]="'6px'"
                                [skeletonAnimationDuration]="'1.2s'"
                                [skeletonGradient]="true"
                                [skeletonShape]="'rect'"
                            ></div>
                        </swiper-slide>
                    }
                </app-carrousel>
            }
            <app-carrousel [navigation]="false" (onProgress)="handleProgressPopulars($event)">
                @for (movie of moviesPopulars.results; let index = $index; track index) {
                    <swiper-slide (click)="navigateToMovie(movie.id)" class="swiper-slide">
                        <img [src]="movie.poster_path | imagePoster: 'w500'" alt="" />
                    </swiper-slide>
                }
            </app-carrousel>
        </section>

        <section class="movies__swiper">
            <h2 class="movies__swiper-title"><mat-icon class="" matSuffix>arrow_forward</mat-icon> Top Rated Movies</h2>
            <app-carrousel [navigation]="false" (onProgress)="handleProgressTopRated($event)">
                @for (movie of moviesTopRated.results; let index = $index; track index) {
                    <swiper-slide (click)="navigateToMovie(movie.id)" class="swiper-slide">
                        <img [src]="movie.poster_path | imagePoster: 'w500'" [alt]="movie.title" />
                    </swiper-slide>
                }
            </app-carrousel>
        </section>

        <section class="movies__swiper">
            <h2 class="movies__swiper-title"><mat-icon class="" matSuffix>arrow_forward</mat-icon> Now Playing Movies</h2>
            <app-carrousel [navigation]="false" (onProgress)="handleProgressNowPlaying($event)">
                @for (movie of moviesNowPlaying.results; let index = $index; track index) {
                    <swiper-slide (click)="navigateToMovie(movie.id)" class="swiper-slide">
                        <img [src]="movie.poster_path | imagePoster: 'w500'" [alt]="movie.title" />
                    </swiper-slide>
                }
            </app-carrousel>
        </section>

        <section class="movies__swiper">
            <h2 class="movies__swiper-title"><mat-icon class="" matSuffix>arrow_forward</mat-icon> Upcoming Movies</h2>
            <app-carrousel [navigation]="false" (onProgress)="handleProgressUpcoming($event)">
                @for (movie of moviesUpcoming.results; let index = $index; track index) {
                    <swiper-slide (click)="navigateToMovie(movie.id)" class="swiper-slide">
                        <img [src]="movie.poster_path | imagePoster: 'w500'" [alt]="movie.title" />
                    </swiper-slide>
                }
            </app-carrousel>
        </section>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    styleUrl: './tab-movies-content.scss',
})
export class TabMoviesContent {
    protected readonly store = inject(MoviesStore);
    readonly #router = inject(Router);

    handleProgressPopulars(progress: number) {
        const isLoading = this.store.isLoading();
        if (progress >= 0.85 && !isLoading) {
            this.store.loadPopular(this.store.popular.page());
        }
    }

    handleProgressTopRated(progress: number) {
        const isLoading = this.store.isLoading();
        if (progress >= 0.85 && !isLoading) {
            this.store.loadTopRated(this.store.topReated.page());
        }
    }

    handleProgressNowPlaying(progress: number) {
        const isLoading = this.store.isLoading();
        if (progress >= 0.85 && !isLoading) {
            this.store.loadNowPlaying(this.store.nowPlaying.page());
        }
    }

    handleProgressUpcoming(progress: number) {
        const isLoading = this.store.isLoading();
        if (progress >= 0.85 && !isLoading) {
            this.store.loadUpcoming(this.store.upcoming.page());
        }
    }

    navigateToMovie(id: number) {
        this.#router.navigate([`/movies/${id}`]);
    }
}
