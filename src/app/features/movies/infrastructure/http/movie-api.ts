import { environment } from '@/environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { inject, type Signal } from '@angular/core';
import type { MovieApiPort } from '../../domain/port/movie-api.port';
import type { Movie, MoviePopular } from '../interfaces/movie.interface';

export class MovieApi implements MovieApiPort {
	#apiUrl = environment.apis['moviedb'];
	#http = inject(HttpClient);

	getPopulars(page: Signal<number>) {
		return httpResource<MoviePopular>(() => ({
			url: this.#apiUrl.endpoints['popular'],
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
			url: `${this.#apiUrl.endpoints['movie']}/${id()}`,
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
		return this.#http.get<MoviePopular>(`${this.#apiUrl.endpoints['popular']}`, {
			headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
			params: {
				language: 'en-US',
				page: page,
				region: 'US',
			},
		});
	}
}
