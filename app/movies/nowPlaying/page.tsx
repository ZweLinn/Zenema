'use client';
import { useGetNowPlayingMoviesQuery } from "@/lib/features/movie/nowPlayingMovieApiSlice";
import NowPlayingMovieLists from "./nowPlayingMovieLists";
import NowPlaying from "@/type/movies/nowPlaying/nowPlaying";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import LoadingEffect from "../../components/Loading";
import ErrorEffect from "../../components/Error";


export default function TopRatedMoviePage() {

    const [fetchPage, setFetchPage] = useState(1);
    const { data: NowPlayingMovies, isLoading, isError } = useGetNowPlayingMoviesQuery(fetchPage);

    console.log("NowPlayingMovies", NowPlayingMovies);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [fetchPage]);

    if (isLoading) return (<LoadingEffect />);
    if(isError) return (<ErrorEffect message="Error! : Something went wrong"/>);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-mainText my-6">Top Rated Movies</h1>
            <div className="justify-center flex flex-col items-center">
                {NowPlayingMovies && <NowPlayingMovieLists nowPlaying={NowPlayingMovies as NowPlaying} />}
            </div>

            <div className="flex justify-center mt-10">
                <Pagination fetchPage={fetchPage} setFetchPage={setFetchPage} />
            </div>
        </div>
    )
}
