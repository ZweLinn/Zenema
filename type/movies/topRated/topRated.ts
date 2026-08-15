import TopRatedMovieResult from "./topRatedResult";

export default interface TopRated {
    page: number,
    results: TopRatedMovieResult[],
    total_results: number,
    total_pages: number
}