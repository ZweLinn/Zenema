'use client';
import ErrorEffect from "@/app/components/Error";
import LoadingEffect from "@/app/components/Loading";
import { useGetSerieDetailQuery } from "@/lib/features/serieDetail/serieDetailApiSlice";
import { useParams } from "next/navigation";
import SerieHeroSection from "./SerieHeroSection";
import SerieDetail from "@/type/serieDetail/SerieDetail";
import { useGetserieVideoQuery } from "@/lib/features/video/serieVideoApiSlice";
import VideoResults from "@/type/video/videoResults";
export default function SerieDetailPage() {
    const { id } = useParams();
    const { data: serieData, isLoading, isError } = useGetSerieDetailQuery(id);
    const { data: videoData, isLoading: videoIsLoading, isError: videoIsError } = useGetserieVideoQuery(id);

    if (isLoading) return (<LoadingEffect />);
    if (isError) return (<ErrorEffect message="Error! : Something went wrong" />);

    return (
        <div>
            <h1>Serie Detail {id}</h1>
            {
                serieData && videoData && (<SerieHeroSection SerieDetail={serieData as SerieDetail} videoData={videoData.results as VideoResults[]} />)
            }
        </div>
    );
}