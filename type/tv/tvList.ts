import type TvResult from "./tvResult";

export default interface TvList {
    page: number,
    results: TvResult[],
    total_results: number,
    total_pages: number
}
