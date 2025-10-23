import { Component, input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-card',
    imports: [MatCardModule, MatButtonModule],
    template: `
        <mat-card class="example-card" appearance="outlined">
            <mat-card-header>
                <div mat-card-avatar class="example-header-image"></div>
                <mat-card-title>{{ $pokemon().name }}</mat-card-title>
                <mat-card-subtitle>Dog Breed</mat-card-subtitle>
            </mat-card-header>
            <img mat-card-image [src]="getImage($pokemon().name)" alt="Photo of a Shiba Inu" />
            <mat-card-content>
                <p>
                    The Shiba Inu is the smallest of the six original and distinct spitz breeds of
                    dog from Japan. A small, agile dog that copes very well with mountainous
                    terrain, the Shiba Inu was originally bred for hunting.
                </p>
            </mat-card-content>
            <mat-card-actions>
                <button matButton>LIKE</button>
                <button matButton>SHARE</button>
            </mat-card-actions>
        </mat-card>
    `,
    styleUrl: './card.scss',
})
export class Card {
    $pokemon = input.required<Pokemon>({ alias: 'pokemon' });

    getImage(url: string) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}`;
    }
}
