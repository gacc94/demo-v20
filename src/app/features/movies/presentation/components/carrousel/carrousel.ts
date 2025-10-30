import { CommonModule } from '@angular/common';
import { type AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, type ElementRef, input, output, viewChild } from '@angular/core';
import type { SwiperContainer } from 'swiper/element';

@Component({
	selector: 'app-carrousel',
	imports: [CommonModule],
	template: `
        <swiper-container [init]="false" #swiperContainer class="swiper" autoplay="true">
            <ng-content />
        </swiper-container>
    `,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	styleUrl: './carrousel.scss',
})
export class Carrousel implements AfterViewInit {
	$swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperContainer');

	$slidesPerView = input<number>(5.5, { alias: 'slidesPerView' });
	$spaceBetween = input<number>(20, { alias: 'spaceBetween' });
	$navigation = input<boolean>(false, { alias: 'navigation' });
	$pagination = input<boolean>(false, { alias: 'pagination' });
	$autoplay = input<boolean>(true, { alias: 'autoplay' });
	$loop = input<boolean>(false, { alias: 'loop' });
	$effect = input<string>('slide', { alias: 'effect' });
	$breakpoints = input<SwiperContainer['breakpoints']>({}, { alias: 'breakpoints' });

	$onProgress = output<number>({ alias: 'onProgress' });

	private defaultBreakpoints = {
		0: {
			slidesPerView: 2.5,
			spaceBetween: 8,
		},
		640: {
			slidesPerView: 3.25,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3.75,
			spaceBetween: 15,
		},
		1024: {
			slidesPerView: 5.25,
			spaceBetween: 20,
		},
	};

	ngAfterViewInit() {
		const swiperRef = this.$swiperRef()?.nativeElement;
		if (!swiperRef) return;

		Object.assign(swiperRef, {
			slidesPerView: this.$slidesPerView(),
			spaceBetween: this.$spaceBetween(),
			// navigation: this.$navigationLink(),
			// pagination: this.$pagination(),
			autoplay: this.$autoplay(),
			loop: this.$loop(),
			effect: this.$effect(),
			breakpoints: Object.keys(this.$breakpoints() ?? {}).length > 0 ? this.$breakpoints() : this.defaultBreakpoints,
		});

		swiperRef.swiper?.on('progress', (_, progress) => {
			this.$onProgress.emit(progress);
		});

		swiperRef.initialize();
	}
}
