import NowPlayingResult from "./nowPlayingResult";


export default interface TopRated {
    dates: {
        minimum: string,
        maximum: string
    },
    page: number,
    results: NowPlayingResult[],
    total_results: number,
    total_pages: number
}
