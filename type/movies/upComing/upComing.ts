import UpComingMovieResult from "./upComingResult";

export default interface UpComing {
    page: number,
    results: UpComingMovieResult[],
    total_results: number,
    total_pages: number
}
