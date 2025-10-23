import { Pokemon } from './../../interfaces/pokemon.interface';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PokemonApi } from '../../sevices/pokemon-api';
import { Card } from '../../components/card/card';

@Component({
    selector: 'app-list-pokemon',
    imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
    template: `
        <section>
            <mat-form-field appearance="outline">
                <mat-label>Search Pokemon </mat-label>
                <mat-icon matPrefix color="primary">search</mat-icon>
                <input matInput placeholder="Search Pokemons" />
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
    styleUrl: './list-pokemon.scss',
})
export default class ListPokemon {
    #pokemonApi = inject(PokemonApi);

    $pokemonRes = this.#pokemonApi.getAll();
}
