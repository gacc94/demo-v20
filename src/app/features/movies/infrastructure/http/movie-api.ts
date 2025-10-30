import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MovieApiPort } from '../../domain/port/movie-api.port';
import type { MovieCreditsResponse } from '../interfaces/credits.interface';
import type { Movie, MovieResponse } from '../interfaces/movie.interface';

export class MovieApi implements MovieApiPort {
	#apiUrl = environment.apis.moviedb;
	#http = inject(HttpClient);

	getPopularsPage(page: number) {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.popular}`, {
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}

	searchMovies(query: string, page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.search}`, {
			params: {
				language: 'en-US',
				query: `${query}`,
				include_adult: false,
				page: page,
				region: 'US',
			},
		});
	}

	getMovieByIdHttp(id: number): Observable<Movie> {
		return this.#http.get<Movie>(`${this.#apiUrl.endpoints.details}/${id}`, {
			params: {
				language: 'en-US',
				region: 'US',
			},
		});
	}

	getTopRated(page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.topRated}`, {
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}

	getNowPlaying(page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.nowPlaying}`, {
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}

	getUpcoming(page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.upcoming}`, {
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}

	getCredits(id: number): Observable<MovieCreditsResponse> {
		return this.#http.get<MovieCreditsResponse>(`${this.#apiUrl.endpoints.details}/${id}/credits`, {
			params: {
				language: 'en-US',
				region: 'US',
			},
		});
	}
}
