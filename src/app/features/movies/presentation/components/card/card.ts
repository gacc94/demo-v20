import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import type { Movie } from '../../../infrastructure/interfaces/movie.interface';
import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';

@Component({
	selector: 'app-card',
	imports: [MaterialModule, ImagePosterPipe, RouterModule],
	template: `
        @let movie = $movie();
        <mat-card routerLink="/movies/{{ movie.id }}">
            <img matCardImage [src]="movie.poster_path | imagePoster: 'w500'" [alt]="movie.title" loading="lazy" />
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
