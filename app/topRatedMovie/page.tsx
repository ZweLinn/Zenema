'use client';
import { useGetTopRatedMoviesQuery } from "@/lib/features/topRatedMovie/topRatedMovieApiSlice";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import LoadingEffect from "../components/Loading";
import TopRatedMovieLists from "./topRateMovieLists";
import TopRated from "@/type/topRatedMovie/topRated";
import ErrorEffect from "../components/Error";


export default function TopRatedMoviePage() {

    const [fetchPage, setFetchPage] = useState(1);
    const { data: TopRatedMovies, isLoading, isError } = useGetTopRatedMoviesQuery(fetchPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [fetchPage]);

    if (isLoading) return (<LoadingEffect />);
    if(isError) return (<ErrorEffect message="Error! : Something went wrong"/>);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-mainText my-6">Top Rated Movies</h1>
            <div className="justify-center flex flex-col items-center">
                {TopRatedMovies && <TopRatedMovieLists topRatedMovie={TopRatedMovies as TopRated} />}
            </div>

            <div className="flex justify-center mt-10">
                <Pagination fetchPage={fetchPage} setFetchPage={setFetchPage} />
            </div>
        </div>
    )
}