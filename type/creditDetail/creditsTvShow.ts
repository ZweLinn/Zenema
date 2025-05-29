export default interface CreditsTvShow {
    adult: boolean;
    backdrop_path: string | null;
    character: string;
    credit_id: string;
    episode_count: number;
    first_air_date: string;
    first_credit_air_date : number;
    genre_ids: number[];
    id: number;
    name : string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}