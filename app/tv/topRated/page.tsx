"use client";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import LoadingEffect from "../../components/Loading";
import ErrorEffect from "../../components/Error";
import { useGetTopRatedTvQuery } from "@/lib/features/tv/tvListApiSlice";
import type TvList from "@/type/tv/tvList";
import TvLists from "../../components/TvLists";

export default function TopRatedTvPage() {
    const [fetchPage, setFetchPage] = useState(1);
    const {
        data: TopRatedTv,
        isLoading,
        isError,
    } = useGetTopRatedTvQuery(fetchPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [fetchPage]);

    if (isLoading) return <LoadingEffect />;
    if (isError) return <ErrorEffect message="Error! : Something went wrong" />;

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-mainText my-6">
                Top Rated TV Shows
            </h1>
            <div className="justify-center flex flex-col items-center">
                {TopRatedTv && (
                    <TvLists
                        tvList={TopRatedTv as TvList}
                    />
                )}
            </div>

            <div className="flex justify-center mt-10">
                <Pagination fetchPage={fetchPage} setFetchPage={setFetchPage} />
            </div>
        </div>
    );
}
