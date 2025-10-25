import type { HttpResourceRef } from '@angular/common/http';
import type { Movie, MoviePopular } from '../../infrastructure/interfaces/movie.interface';
import type { Signal } from '@angular/core';

export interface MovieApiPort {
	getPopulars(page?: Signal<number>): HttpResourceRef<MoviePopular | undefined>;
	getMovieById(id: Signal<number>): HttpResourceRef<Movie | undefined>;
	// search(query: string): Promise<any>;
}
