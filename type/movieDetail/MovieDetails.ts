import Genre from "./Genre";
import ProductionCompany from "./Production_company";
import ProductionCountry from "./Production_country";

export default interface MovieDetails {
    
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | string;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_country: Array<string>;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: any[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number; 
}