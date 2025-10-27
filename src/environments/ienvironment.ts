export interface Environment {
	name: string;
	production: boolean;
	apis: {
		moviedb: {
			apiKey: string;
			endpoints: {
				details: string;
				popular: string;
				search: string;
				topRated: string;
				nowPlaying: string;
				upcoming: string;
			};
		};
	};
}
