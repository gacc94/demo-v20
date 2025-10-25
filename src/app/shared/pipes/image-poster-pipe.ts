import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'imagePoster',
})
export class ImagePosterPipe implements PipeTransform {
	transform(image?: string, width: string = 'w500'): string {
		const widthMap: Record<string, string> = {
			w500: 'w500',
			w700: 'w700',
			w800: 'w800',
			w900: 'w900',
		};

		return image
			? `https://image.tmdb.org/t/p/${widthMap[width] ?? 'w500'}/${image}`
			: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png';
	}
}
