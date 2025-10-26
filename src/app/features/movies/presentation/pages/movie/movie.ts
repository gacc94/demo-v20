import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { TransitionNamePipe } from '@/app/shared/pipes/transition-name-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component, inject, input, linkedSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';

@Component({
	selector: 'app-movie',
	imports: [ImagePosterPipe, TransitionNamePipe, MaterialModule, RouterModule],
	template: `
        @let movieId = $movieId();
        @let movie = $movie();
         <mat-toolbar>
            <button mat-icon-button routerLink="/movies">
                <mat-icon class="mat-24">arrow_back</mat-icon>
            </button>
            <span>{{ movie?.title }}</span>
        </mat-toolbar>

        <section class="section">

            <div class="movie-header">
                <h1 class="movie-title">Movie Details</h1>
                <p class="movie-id">ID: {{ movieId }}</p>
            </div>

            @if (movie) {
                <img
                    [src]="movie?.backdrop_path | imagePoster: 'w500'"
                    [alt]="movie?.title" class="poster-image"
                    [style.view-transition-name]="movie.title | transitionName: movie.id.toString()"
                />
            }

        </section>
    `,
	styleUrl: './movie.scss',
})
export default class Movie {
	$movieId = input.required<number>({ alias: 'id' });
	readonly store = inject(MoviesStore);

	$movie = linkedSignal(() => this.store.movieById(this.$movieId()));
}
