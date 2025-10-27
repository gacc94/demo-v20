import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { TransitionNamePipe } from '@/app/shared/pipes/transition-name-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';

@Component({
	selector: 'app-movie',
	imports: [ImagePosterPipe, TransitionNamePipe, MaterialModule, RouterModule],
	template: `
        @let movie = store.movie();
         <mat-toolbar>
            <button mat-icon-button (click)="back()">
                <mat-icon class="mat-24">arrow_back</mat-icon>
            </button>
            <span>{{ movie?.title }}</span>
        </mat-toolbar>

        @if (store.isLoadingMovie()) {
            <div class="movies__loading">
                <mat-progress-spinner class="movies__progress" mode="indeterminate" ></mat-progress-spinner>
            </div>
        } @else {
            <section class="section">
            <div class="movie-header">
                <h1 class="movie-title">Movie Details</h1>
                <p class="movie-id">ID: {{ $movieId() }}</p>
            </div>

            @if (movie) {
                <img
                    [src]="movie?.backdrop_path | imagePoster: 'w500'"
                    [alt]="movie?.title" class="poster-image"
                    [style.view-transition-name]="movie.title | transitionName: movie.id.toString()"
                />
            }
        </section>
        }


    `,
	styleUrl: './movie.scss',
})
export default class Movie {
	$movieId = input.required<number>({ alias: 'id' });
	readonly store = inject(MoviesStore);
	readonly #router = inject(Router);

	ngOnInit() {
		this.store.loadMovieById(this.$movieId());
	}

	back() {
		this.#router.navigate(['/movies']);
		this.store.clearMovie();
	}
}
