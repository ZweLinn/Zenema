"use client";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import LoadingEffect from "../../components/Loading";
import ErrorEffect from "../../components/Error";
import { useGetUpComingMoviesQuery } from "@/lib/features/movie/upComingMovieApiSlice";
import UpComingMovieLists from "./upcomingMovieLists";
import UpComing from "@/type/movies/upComing/upComing";

export default function UpComingMoviePage() {
    const [fetchPage, setFetchPage] = useState(1);
    const {
        data: UpComingMovies,
        isLoading,
        isError,
    } = useGetUpComingMoviesQuery(fetchPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [fetchPage]);

    if (isLoading) return <LoadingEffect />;
    if (isError) return <ErrorEffect message="Error! : Something went wrong" />;

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-mainText my-6">
                Upcoming Movies
            </h1>
            <div className="justify-center flex flex-col items-center">
                {UpComingMovies && (
                    <UpComingMovieLists
                        upComing={UpComingMovies as UpComing}
                    />
                )}
            </div>

            <div className="flex justify-center mt-10">
                <Pagination fetchPage={fetchPage} setFetchPage={setFetchPage} />
            </div>
        </div>
    );
}
