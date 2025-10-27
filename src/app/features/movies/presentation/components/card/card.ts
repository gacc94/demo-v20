import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { TransitionNamePipe } from '@/app/shared/pipes/transition-name-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';
import type { Movie } from '../../../infrastructure/interfaces/movie.interface';

@Component({
	selector: 'app-card',
	imports: [MaterialModule, ImagePosterPipe, RouterModule, TransitionNamePipe],
	template: `
        @let movie = $movie();
        <mat-card (click)="onMovieId.emit(movie.id)">
            <img matCardImage
                [src]="movie.poster_path | imagePoster: 'w500'"
                [alt]="movie.title" loading="lazy"
                [style.view-transition-name]="movie.title | transitionName: movie.id.toString()"
            />

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

	onMovieId = output<number>({ alias: 'movieId' });
}
