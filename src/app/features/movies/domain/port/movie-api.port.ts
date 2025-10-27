import type { HttpResourceRef } from '@angular/common/http';
import type { Signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Movie, MovieResponse } from '../../infrastructure/interfaces/movie.interface';

export interface MovieApiPort {
	getPopulars(page?: Signal<number>): HttpResourceRef<MovieResponse | undefined>;
	getMovieById(id: Signal<number>): HttpResourceRef<Movie | undefined>;
	getPopularsPage(page: number): Observable<MovieResponse>;
	searchMovies(query: string): Observable<MovieResponse>;
	getMovieByIdHttp: (id: number) => Observable<Movie>;
}
