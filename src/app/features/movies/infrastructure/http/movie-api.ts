import { environment } from '@/environments/environment';
import { httpResource } from '@angular/common/http';
import type { MoviePopular, Movie } from '../interfaces/movie.interface';
import type { MovieApiPort } from '../../domain/port/movie-api.port';
import type { Signal } from '@angular/core';

export class MovieApi implements MovieApiPort {
	#apiUrl = environment.apis['moviedb'];

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
}
