import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';
import { Card } from '../../components/card/card';
import { Carrousel } from '../../components/carrousel/carrousel';

@Component({
	selector: 'app-movies',
	imports: [MaterialModule, CommonModule, Card, ImagePosterPipe, RouterModule, ReactiveFormsModule, Carrousel],
	template: `
        @let moviesPopulars = store.popularMovies();
        @let moviesSearch = store.searchMovies();
        <main class="movies movies--main">
            <mat-toolbar>
                <button mat-icon-button routerLink="/">
                    <mat-icon class="mat-24">arrow_back</mat-icon>
                </button>
                <span>Movies</span>
                <mat-icon matSuffix color="primary">movie</mat-icon>
            </mat-toolbar>

            <section class="movies__search-container">
                <div class="movies__search-form-container">
                    <mat-form-field class="movies__search-form-field" appearance="outline">
                        <mat-icon class="movies__search-form-icon" matSuffix color="primary">search</mat-icon>
                        <input
                            class="movies__search-form-input"
                            matInput
                            placeholder="Search Movies"
                            [formControl]="store.searchControl"
                            [value]="store.searchControl.value"
                        />
                    </mat-form-field>
                </div>
            </section>

            <section class="movies__swiper">
                <h2 class="movies__swiper-title"><mat-icon class="" matSuffix>arrow_forward</mat-icon> Popular Movies</h2>
                <app-carrousel [navigation]="false" (onProgress)="handleProgress($event)">
                    @for (movie of moviesPopulars.results; let index = $index; track index) {
                        <swiper-slide (click)="navigateToMovie(movie.id)"
                            class="swiper-slide">
                            <img [src]="movie.poster_path | imagePoster: 'w500'" alt="" />
                        </swiper-slide>
                    }
                </app-carrousel>
            </section>

            @if (store.isLoading()) {
                <div class="movies__search-loading">
                    <mat-progress-spinner class="movies__progress" mode="indeterminate"></mat-progress-spinner>
                </div>
            }

            @else {
                <section class="movies__grid">
                    @for (movie of moviesSearch.results; let index = $index; track index) {
                        <app-card class="movies__card" [movie]="movie" (movieId)="navigateToMovie($event)"> </app-card>
                    } @empty {
                        <p>No movies found</p>
                    }
                </section>
            }
        </main>
    `,
	styleUrl: './movies.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class Movies {
	readonly store = inject(MoviesStore);
	readonly #router = inject(Router);

	navigateToMovie(id: number) {
		this.#router.navigate([`/movies/${id}`]);
	}

	handleProgress(progress: number) {
		const isLoading = this.store.isLoading();
		if (progress >= 0.9 && !isLoading) {
			this.store.loadPopularsPage(this.store.page());
		}
	}
}
