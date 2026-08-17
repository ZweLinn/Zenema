"use client";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import LoadingEffect from "../../components/Loading";
import ErrorEffect from "../../components/Error";
import { useGetPopularMoviesQuery } from "@/lib/features/movie/popularMovieApiSlice";
import Popular from "@/type/movies/popular/popular";
import PopularMovieLists from "./popularMovieLists";

export default function PopularMoviePage() {
    const [fetchPage, setFetchPage] = useState(1);
    const {
        data: PopularMovies,
        isLoading,
        isError,
    } = useGetPopularMoviesQuery(fetchPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [fetchPage]);

    if (isLoading) return <LoadingEffect />;
    if (isError) return <ErrorEffect message="Error! : Something went wrong" />;

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-mainText my-6">
                Popular Movies
            </h1>
            <div className="justify-center flex flex-col items-center">
                {PopularMovies && (
                    <PopularMovieLists
                        popular={PopularMovies as Popular}
                    />
                )}
            </div>

            <div className="flex justify-center mt-10">
                <Pagination fetchPage={fetchPage} setFetchPage={setFetchPage} />
            </div>
        </div>
    );
}
