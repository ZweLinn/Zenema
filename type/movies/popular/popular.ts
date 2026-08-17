import PopularMovieResult from "./popularResult";

export default interface Popular {
    page: number,
    results: PopularMovieResult[],
    total_results: number,
    total_pages: number
}
