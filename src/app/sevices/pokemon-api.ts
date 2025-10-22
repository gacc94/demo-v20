import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PokemonApi {
    getAll(limit: number = 151) {
        return httpResource(() => {
            return {
                url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
            };
        });
    }
}
