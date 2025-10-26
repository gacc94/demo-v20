import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'transitionName',
})
export class TransitionNamePipe implements PipeTransform {
	transform(value: string, id: string): string {
		return `${value}-${id}`;
	}
}
