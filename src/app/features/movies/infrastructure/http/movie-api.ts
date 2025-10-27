import { environment } from '@/environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { inject, type Signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MovieApiPort } from '../../domain/port/movie-api.port';
import type { Movie, MovieResponse } from '../interfaces/movie.interface';

export class MovieApi implements MovieApiPort {
	#apiUrl = environment.apis.moviedb;
	#http = inject(HttpClient);

	getPopulars(page: Signal<number>) {
		return httpResource<MovieResponse>(() => ({
			url: this.#apiUrl.endpoints.popular,
			method: 'GET',
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			params: {
				language: 'en-US',
				page: page(),
				region: 'US',
			},
		}));
	}

	getMovieById(id: Signal<number>) {
		return httpResource<Movie>(() => ({
			url: `${this.#apiUrl.endpoints.details}/${id()}`,
			method: 'GET',
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			// params: {
			// 	language: 'en-US',
			// 	// page: page ?? 1,
			// 	region: 'US',
			// },
		}));
	}

	getPopularsPage(page: number) {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.popular}`, {
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}

	searchMovies(query: string, page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.search}`, {
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
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
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			params: {
				language: 'en-US',
				region: 'US',
			},
		});
	}

	getTopRated(page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.topRated}`, {
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}

	getNowPlaying(page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.nowPlaying}`, {
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}

	getUpcoming(page: number): Observable<MovieResponse> {
		return this.#http.get<MovieResponse>(`${this.#apiUrl.endpoints.upcoming}`, {
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}
}
