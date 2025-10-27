import type { HttpResourceRef } from '@angular/common/http';
import type { Signal } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MovieCreditsResponse } from '../../infrastructure/interfaces/credits.interface';
import type { Movie, MovieResponse } from '../../infrastructure/interfaces/movie.interface';

export interface MovieApiPort {
	getPopulars(page?: Signal<number>): HttpResourceRef<MovieResponse | undefined>;
	getMovieById(id: Signal<number>): HttpResourceRef<Movie | undefined>;
	getPopularsPage(page: number): Observable<MovieResponse>;
	searchMovies(query: string, page: number): Observable<MovieResponse>;
	getMovieByIdHttp: (id: number) => Observable<Movie>;
	getTopRated(page: number): Observable<MovieResponse>;
	getNowPlaying(page: number): Observable<MovieResponse>;
	getUpcoming(page: number): Observable<MovieResponse>;
	getCredits(id: number): Observable<MovieCreditsResponse>;
}
