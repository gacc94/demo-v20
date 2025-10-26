import type { HttpResourceRef } from '@angular/common/http';
import type { Movie, MoviePopular } from '../../infrastructure/interfaces/movie.interface';
import type { Signal } from '@angular/core';
import type { Observable } from 'rxjs';

export interface MovieApiPort {
	getPopulars(page?: Signal<number>): HttpResourceRef<MoviePopular | undefined>;
	getMovieById(id: Signal<number>): HttpResourceRef<Movie | undefined>;
	getPopularsPage(page: number): Observable<MoviePopular>;
	// search(query: string): Promise<any>;
}
