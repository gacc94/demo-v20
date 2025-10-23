import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home'),
    },
    {
        path: 'movies',
        loadComponent: () => import('./features/movies/presentation/pages/movies/movies'),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
