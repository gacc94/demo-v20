import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-list-pokemon',
    imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
    template: `
        <mat-form-field appearance="outline">
            <mat-label>Label</mat-label>
            <input matInput />
        </mat-form-field>
    `,
    styleUrl: './list-pokemon.scss',
})
export default class ListPokemon {}
