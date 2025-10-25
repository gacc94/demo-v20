import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@/app/shared/utils/material.module';
import {
	type AfterViewInit,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	type ElementRef,
	linkedSignal,
	signal,
	viewChild,
	type WritableSignal,
	type OnInit,
	inject,
} from '@angular/core';
import { MOVIEDB_HTTP } from '../../../infrastructure/providers/movie.provider';
import { Card } from '../../components/card/card';
import { ImagePosterPipe } from '@/app/shared/pipes/image-poster-pipe';
import type { SwiperContainer } from 'swiper/element';
import type { Movie } from '../../../infrastructure/interfaces/movie.interface';

@Component({
	selector: 'app-movies',
	imports: [MaterialModule, CommonModule, Card, ImagePosterPipe, RouterModule],
	template: `
        <main class="movies movies--main">
            @let movies = $populars();

            <mat-toolbar>
                <button mat-icon-button routerLink="/">
                    <mat-icon class="mat-24">arrow_back</mat-icon>
                </button>
                <span>Movies</span>
                <mat-icon matSuffix color="primary">movie</mat-icon>
            </mat-toolbar>

            <!-- <mat-progress-bar mode="indeterminate" *ngIf="$popularsResource.isLoading()"></mat-progress-bar> -->

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
                    @for (movie of movies; let index = $index; track index) {
                        <swiper-slide
                            class="swiper-slide">
                            <img [src]="movie.poster_path | imagePoster: 'w500'" alt="" />
                        </swiper-slide>
                    }
                </swiper-container>
            </section>

            <section class="movies__grid">
                @for (movie of movies; let index = $index; track index) {
                    <app-card class="movies__card" [movie]="movie"> </app-card>
                }
            </section>
        </main>
    `,
	styleUrl: './movies.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class Movies implements OnInit, AfterViewInit {
	#moviedbApi = inject(MOVIEDB_HTTP);
	// #router = inject(Router);
	$swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperContainer');
	$page = signal<number>(1);

	$popularsResource = this.#moviedbApi.getPopulars(this.$page);
	$populars: WritableSignal<Movie[] | undefined> = linkedSignal({
		source: () => this.$popularsResource.value(),
		computation: (moviePopulars, prev) => {
			const movies = moviePopulars?.results ?? [];
			const prevMovies = prev?.value ?? [];
			if (!movies.length) return prevMovies;

			return prevMovies.concat(movies);
		},
	});

	ngOnInit() {}

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
			const isLoading = this.$popularsResource.isLoading();
			if (progress >= 0.85 && !isLoading) {
				this.$page.update((prev) => prev + 1);
			}
		});
	}
}
