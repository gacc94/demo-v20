import { MaterialModule } from '@/app/shared/utils/material.module';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOVIEDB_HTTP } from '../../../infrastructure/providers/movie.provider';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/card/card';

@Component({
    selector: 'app-movies',
    imports: [MaterialModule, RouterLink, CommonModule, Card],
    template: `
        <main class="movies movies--main">
            <mat-toolbar>
                <button mat-icon-button routerLink="/">
                    <mat-icon class="mat-24">arrow_back</mat-icon>
                </button>
                <span>Movies</span>
                <mat-icon matSuffix color="primary">movie</mat-icon>
            </mat-toolbar>

            <section class="movies__search-container">
                <div class="movies__search-form-container">
                    <mat-form-field class="movies__search-form-field" appearance="outline">
                        <mat-icon class="movies__search-form-icon" matSuffix color="primary">search</mat-icon>
                        <input class="movies__search-form-input" matInput placeholder="Search Movies" />
                    </mat-form-field>
                </div>
            </section>

            <section class="movies__grid">
                @let movies = $populars.value();
                @for (movie of movies?.results; let index = $index; track index) {
                    <app-card class="movies__card" [movie]="movie"> </app-card>
                }
            </section>
        </main>
    `,
    styleUrl: './movies.scss',
})
export default class Movies implements OnInit {
    #moviedbApi = inject(MOVIEDB_HTTP);

    $populars = this.#moviedbApi.getPopulars();

    ngOnInit() {}
}
