import type { Environment } from './ienvironment';

const MOVIEDB = 'https://api.themoviedb.org/3';

export const environment: Environment = {
	name: 'local',
	production: false,
	apis: {
		moviedb: {
			apiKey:
				'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGVmNmVhMzhkYzYwMzQwYmRjNTc4NzJlNzQwMDIxYyIsIm5iZiI6MTY2NTc2MjkyMy40MjU5OTk5LCJzdWIiOiI2MzQ5ODY2YmIwNDYwNTAwODE2NjNiMWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BV38AQ2604fpxPDiFyUt01U4VjUXDBSxZWduqV8JYJA',
			endpoints: {
				details: `${MOVIEDB}/movie`,
				popular: `${MOVIEDB}/movie/popular`,
				search: `${MOVIEDB}/search/movie`,
				topRated: `${MOVIEDB}/movie/top_rated`,
				nowPlaying: `${MOVIEDB}/movie/now_playing`,
				upcoming: `${MOVIEDB}/movie/upcoming`,
			},
		},
	},
};
