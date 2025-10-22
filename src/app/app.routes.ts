import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () => import('./pages/list-pokemon/list-pokemon'),
    },
];
