import Genre from "../movieDetail/Genre";

export default interface SerieDetail {
    aduult: boolean;
    backdrop_path: string | null;
    created_by : any[];
    episode_run_time: number[];
    first_air_date: string;
    genres : Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: any[];
    name : string;
    network: any[];
    next_episode_to_air: any[] | null;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: any[];
    production_countries: any[];
    seasons: any[];
    spoken_languages: any[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}