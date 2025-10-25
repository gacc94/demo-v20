import { Component, input, inject, linkedSignal } from '@angular/core';
import { MOVIEDB_HTTP } from '../../../infrastructure/providers/movie.provider';

@Component({
	selector: 'app-movie',
	imports: [],
	template: `
        @let movieId = $movieId();
        @let movieResource = $movieResource();
        <section class="section">
            <div class="movie-header">
                <h1 class="movie-title">Movie Details</h1>
                <p class="movie-id">ID: {{ movieId }}</p>
            </div>

            <!-- @if (movieResource.isLoading()) {
                <div class="loading-state">
                    <p>Loading movie details...</p>
                </div>
            } @else if (movieResource.value(); as movie) {
                    <div class="movie-content">
                        <div class="movie-poster">
                            @if (movie.poster_path) {
                                <img [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                                     [alt]="movie.title + ' poster'"
                                     class="poster-image" />
                            }
                        </div>
                        <div class="movie-details">
                            <h2 class="movie-title">{{ movie.title }}</h2>
                            @if (movie.original_title !== movie.title) {
                                <p class="movie-original-title">Original: {{ movie.original_title }}</p>
                            }
                            <p class="movie-overview">{{ movie.overview }}</p>
                            <div class="movie-meta">
                                <span class="movie-year">{{ movie.release_date | date:'yyyy' }}</span>
                                <span class="movie-rating">★ {{ movie.vote_average }}/10</span>
                                <span class="movie-votes">({{ movie.vote_count }} votes)</span>
                            </div>
                            <div class="movie-additional">
                                <span class="movie-language">{{ movie.original_language | uppercase }}</span>
                                @if (movie.adult) {
                                    <span class="movie-adult">Adult</span>
                                }
                            </div>
                        </div>
                    </div>
                } @else if (movieResource.error()) {
                    <div class="error-state">
                        <p>Error loading movie: {{ movieResource.error() }}</p>
                    </div>
                }
            } @else {
                <div class="waiting-state">
                    <p>Waiting for movie ID...</p>
                </div>
            } -->
        </section>
    `,
	styleUrl: './movie.scss',
})
export default class Movie {
	#moviedbApi = inject(MOVIEDB_HTTP);
	$movieId = input.required<number>({ alias: 'id' });

	$movieResource = linkedSignal({
		source: () => this.$movieId,
		computation: (id) => this.#moviedbApi.getMovieById(id),
	});
}
