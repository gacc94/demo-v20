import type { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home'),
    },
    {
        path: 'movies',
        loadChildren: () => import('./features/movies/movies.routes'),
        // providers: [MoviesStore],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
