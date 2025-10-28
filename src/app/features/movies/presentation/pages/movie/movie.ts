import { Skeleton } from '@/app/shared/directives/skeleton';
import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { TransitionNamePipe } from '@/app/shared/pipes/transition-name-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';
import { Carrousel } from '../../components/carrousel/carrousel';

@Component({
    selector: 'app-movie',
    imports: [ImagePosterPipe, TransitionNamePipe, MaterialModule, RouterModule, Carrousel, Skeleton],
    template: `
        @let movie = store.movie();
        <mat-toolbar>
            <button mat-icon-button (click)="back()">
                <mat-icon class="mat-24">arrow_back</mat-icon>
            </button>
            @if (store.isLoadingMovie()) {
                <div
                    skeleton
                    [isLoading]="true"
                    [skeletonType]="'wave'"
                    [skeletonLines]="1"
                    [skeletonHeight]="'35px'"
                    [skeletonWidth]="'100%'"
                    [skeletonBorderRadius]="'6px'"
                    [skeletonAnimationDuration]="'1.2s'"
                    [skeletonGradient]="true"
                    [skeletonShape]="'rect'"
                ></div>
            } @else {
                <span>{{ movie?.title }}</span>
            }
        </mat-toolbar>

        @if (store.isLoadingMovie()) {
            <section class="section">
                <div
                    skeleton
                    [isLoading]="true"
                    [skeletonType]="'shimmer'"
                    [skeletonLines]="2"
                    [skeletonHeight]="'3rem'"
                    [skeletonWidth]="'100%'"
                    [skeletonBorderRadius]="'6px'"
                    [skeletonAnimationDuration]="'1.2s'"
                    [skeletonGradient]="true"
                    [skeletonShape]="'rect'"
                    style="margin-bottom: 1rem;"
                ></div>

                <div
                    skeleton
                    [isLoading]="true"
                    [skeletonType]="'wave'"
                    [skeletonLines]="2"
                    [skeletonHeight]="'45vw'"
                    [skeletonWidth]="'100%'"
                    [skeletonBorderRadius]="'6px'"
                    [skeletonAnimationDuration]="'1.2s'"
                    [skeletonGradient]="true"
                    [skeletonShape]="'rect'"
                    style="margin-bottom: 1rem;"
                ></div>

                <div
                    skeleton
                    [isLoading]="true"
                    [skeletonType]="'wave'"
                    [skeletonLines]="2"
                    [skeletonHeight]="'3rem'"
                    [skeletonWidth]="'100%'"
                    [skeletonBorderRadius]="'6px'"
                    [skeletonAnimationDuration]="'1.2s'"
                    [skeletonGradient]="true"
                    [skeletonShape]="'rect'"
                    style="margin-bottom: 1rem;"
                ></div>

                <app-carrousel>
                    @for (credit of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track $index) {
                        <swiper-slide class="swiper-slide">
                            <div
                                skeleton
                                [isLoading]="true"
                                [skeletonType]="'wave'"
                                [skeletonLines]="2"
                                [skeletonHeight]="'10rem'"
                                [skeletonWidth]="'100%'"
                                [skeletonBorderRadius]="'6px'"
                                [skeletonAnimationDuration]="'1.2s'"
                                [skeletonGradient]="true"
                                [skeletonShape]="'rect'"
                                style="margin-bottom: 1rem;"
                            ></div>
                        </swiper-slide>
                    }
                </app-carrousel>
            </section>
        }

        @if (!store.isLoadingMovie()) {
            <section class="section">
                <div class="movie-header">
                    <h1 class="movie-title">Movie Details</h1>
                    <p class="movie-id">ID: {{ $movieId() }}</p>
                </div>

                @if (movie) {
                    <img
                        [src]="movie?.backdrop_path | imagePoster: 'w500'"
                        [alt]="movie?.title"
                        class="poster-image"
                        [style.view-transition-name]="movie.title | transitionName: movie.id.toString()"
                    />
                }

                <h2>Credits</h2>
                <div class="credits__cast">
                    <app-carrousel>
                        @for (credit of store.credits()?.cast; track $index) {
                            <swiper-slide class="swiper-slide">
                                <div class="credits__cast-item">
                                    <img [src]="credit.profile_path! | imagePoster: 'w500'" [alt]="credit.name" />
                                    <p>{{ credit.name }}</p>
                                    <p>{{ credit.character }}</p>
                                </div>
                            </swiper-slide>
                        }
                    </app-carrousel>
                </div>
            </section>
        }
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    styleUrl: './movie.scss',
})
export default class Movie {
    $movieId = input.required<number>({ alias: 'id' });
    readonly store = inject(MoviesStore);
    readonly #router = inject(Router);

    ngOnInit() {
        this.store.loadMovieDetail(this.$movieId());
    }

    back() {
        this.#router.navigate(['/movies']);
        // this.store.clearMovie();
    }
}
