import { CommonModule } from '@angular/common';
import { type AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, type ElementRef, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import { MaterialModule } from '@/app/shared/utils/material.module';
import type { SwiperContainer } from 'swiper/element';
import { MoviesStore } from '../../../infrastructure/stores/movies.store';
import { Card } from '../../components/card/card';

@Component({
	selector: 'app-movies',
	imports: [MaterialModule, CommonModule, Card, ImagePosterPipe, RouterModule],
	template: `
        @let moviesPopulars = store.popularMovies();
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


            <section class="movies__swiper">
                <h2 class="movies__swiper-title"><mat-icon class="" matSuffix>arrow_forward</mat-icon> Popular Movies</h2>
                <swiper-container [init]="false"
                    #swiperContainer
                    autoplay="true"
                    class="mySwiper"
                >
                    @for (movie of moviesPopulars.results; let index = $index; track index) {
                        <swiper-slide [routerLink]="[movie.id]"
                            class="swiper-slide">
                            <img [src]="movie.poster_path | imagePoster: 'w500'" alt="" />
                        </swiper-slide>
                    }
                </swiper-container>
            </section>

            <section class="movies__grid">
                @for (movie of moviesPopulars.results; let index = $index; track index) {
                    <app-card class="movies__card" [movie]="movie"> </app-card>
                }
            </section>
        </main>
    `,
	styleUrl: './movies.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [MoviesStore],
})
export default class Movies implements AfterViewInit {
	readonly store = inject(MoviesStore);
	$swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperContainer');

	// readonly #counter = signal(1);

	ngAfterViewInit() {
		const swiperRef = this.$swiperRef()?.nativeElement;
		if (!swiperRef) return;
		swiperRef.initialize();

		swiperRef.navigation = true;
		swiperRef.pagination = true;
		swiperRef.autoplay = {
			delay: 2500,
			// reverseDirection: true,
			stopOnLastSlide: false,
		};
		swiperRef.animate({
			duration: 2500,
		});
		swiperRef.slidesPerView = 5.5;
		swiperRef.spaceBetween = 20;

		swiperRef.swiper.on('progress', (_, progress) => {
			const isLoading = this.store.isLoading();
			if (progress >= 0.9 && !isLoading) {
				this.store.loadPopularsPage(this.store.page());
			}
		});
	}
}
