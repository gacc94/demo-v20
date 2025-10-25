import { MaterialModule } from '@shared/utils/material.module';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [MaterialModule, CommonModule, RouterModule],
	template: `
        <mat-toolbar>
            <span>Demo Angular v20</span>

            <mat-list>
                @for (item of items; track $index) {
                    <mat-list-item (click)="navigateTo(item)">{{ item }}</mat-list-item>
                }
            </mat-list>
        </mat-toolbar>
    `,
	styleUrl: './home.scss',
})
export default class Home {
	#router = inject(Router);
	items = ['movies', 'pokemon'];

	navigateTo(item: string) {
		const urlTree = this.#router.createUrlTree([item]);
		this.#router.navigateByUrl(urlTree.toString());
	}
}
