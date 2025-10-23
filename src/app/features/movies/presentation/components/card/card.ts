import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component, input } from '@angular/core';
import { Movie } from '../../../infrastructure/interfaces/movie.interface';

@Component({
    selector: 'app-card',
    imports: [MaterialModule],
    template: `
        @let movie = $movie();
        <mat-card>
            <img matCardImage [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
            <mat-card-content>
                <mat-card-title>{{ movie.title }}</mat-card-title>
                <mat-card-subtitle>{{ movie.release_date }}</mat-card-subtitle>
            </mat-card-content>
        </mat-card>
    `,
    styleUrl: './card.scss',
})
export class Card {
    $movie = input.required<Movie>({ alias: 'movie' });
}
