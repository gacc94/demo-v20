import { Component, inject } from '@angular/core';

import { MaterialModule } from '@/app/shared/utils/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';
import { TabMoviesContent } from '../../components/tab-movies-content/tab-movies-content';
import { TabSearchContent } from '../../components/tab-search-content/tab-search-content';

@Component({
    selector: 'app-movies',
    imports: [MaterialModule, CommonModule, ReactiveFormsModule, TabSearchContent, TabMoviesContent],
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
                        <input
                            class="movies__search-form-input"
                            matInput
                            placeholder="Search Movies"
                            [formControl]="store.searchControl"
                            [value]="store.searchControl.value"
                            (input)="store.setSelectedTabIndex(1)"
                            (change)="store.setSelectedTabIndex(1)"
                        />
                    </mat-form-field>
                </div>
            </section>

            <section class="movies__tabs">
                <mat-tab-group mat-align-tabs="center" [selectedIndex]="store.selectedTabIndex()" [preserveContent]="true">
                    <mat-tab label="Movies">
                        <app-tab-movies-content />
                    </mat-tab>
                    <mat-tab label="Search">
                        <app-tab-search-content />
                    </mat-tab>
                </mat-tab-group>
            </section>
        </main>
    `,
    styleUrl: './movies.scss',
})
export default class Movies {
    protected readonly store = inject(MoviesStore);
}
