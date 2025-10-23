import { environment } from '@/environments/environment';
import { httpResource } from '@angular/common/http';
import { MoviePopular } from '../interfaces/movie.interface';
import { MovieApiPort } from '../../domain/port/movie-api.port';

export class MovieApi implements MovieApiPort {
    #apiUrl = environment.apis['moviedb'];

    getPopulars(page?: number) {
        return httpResource<MoviePopular>(() => ({
            url: this.#apiUrl.endpoints.popular,
            method: 'GET',
            headers: { Authorization: `Bearer ${this.#apiUrl.apiKey}` },
            params: {
                language: 'en-US',
                page: page ?? 1,
                region: 'US',
            },
        }));
    }
}
