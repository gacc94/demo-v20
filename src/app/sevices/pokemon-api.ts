import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonResponse } from '../interfaces/pokemon.interface';

@Injectable({
    providedIn: 'root',
})
export class PokemonApi {
    getAll(limit: number = 20, offset: number = 0) {
        return httpResource<PokemonResponse>(
            () => {
                return {
                    url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
                };
            },
            { defaultValue: undefined },
        );
    }
}
