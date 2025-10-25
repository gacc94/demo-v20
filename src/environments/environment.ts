import { Environment } from './ienvironment';

export const environment: Environment = {
	name: 'local',
	production: false,
	apis: {
		moviedb: {
			apiKey:
				'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGVmNmVhMzhkYzYwMzQwYmRjNTc4NzJlNzQwMDIxYyIsIm5iZiI6MTY2NTc2MjkyMy40MjU5OTk5LCJzdWIiOiI2MzQ5ODY2YmIwNDYwNTAwODE2NjNiMWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BV38AQ2604fpxPDiFyUt01U4VjUXDBSxZWduqV8JYJA',
			endpoints: {
                movie: 'https://api.themoviedb.org/3/movie',
				popular: 'https://api.themoviedb.org/3/movie/popular',
				search: 'https://api.themoviedb.org/3/search/movie',
			},
		},
		pokemon: {
			apiKey: 'ee908660108df5850518858806e31702f5582d8547556185',
			endpoints: {
				popular: 'https://pokeapi.co/api/v2/pokemon',
				search: 'https://pokeapi.co/api/v2/pokemon',
			},
		},
	},
};
