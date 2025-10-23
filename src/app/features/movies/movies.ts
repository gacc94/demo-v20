import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component } from '@angular/core';

@Component({
    selector: 'app-movies',
    imports: [MaterialModule],
    template: `
        <section class="movies">
            <h2>Movies</h2>
            <mat-form-field appearance="outline">
                <!-- <mat-label>Search Pokemon </mat-label> -->
                <mat-icon matPrefix color="primary">movie</mat-icon>
                <input matInput placeholder="Search Movies" />
            </mat-form-field>
            <!-- <button mat-stroked-button color="primary">Search</button> -->
        </section>
        <!-- <section class="pokemon__grid">
            @let pokemons = $pokemonRes.value();
            @for (pokemon of pokemons?.results; let index = $index; track index) {
                <app-card [pokemon]="pokemon"> </app-card>
            }
        </section> -->
    `,
    styleUrl: './movies.scss',
})
export default class Movies {}
