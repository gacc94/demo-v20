import type { Routes } from '@angular/router';
import { MoviesStore } from './infrastructure/stores/movies.store';

export default <Routes>[
    {
        path: '',
        loadComponent: () => import('./presentation/pages/movies/movies'),
        // providers: [MoviesStore],
    },
    {
        path: ':id',
        loadComponent: () => import('./presentation/pages/movie/movie'),
        providers: [MoviesStore],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
