export interface Environment {
    name: string;
    production: boolean;
    apis: {
        [key: string]: {
            apiKey?: string;
            endpoints: {
                popular: string;
                search: string;
            };
        };
    };
}
