import { HttpResourceRef } from '@angular/common/http';
import { MoviePopular } from '../../infrastructure/interfaces/movie.interface';

export interface MovieApiPort {
    getPopulars(): HttpResourceRef<MoviePopular | undefined> | any;
    // search(query: string): Promise<any>;
}
