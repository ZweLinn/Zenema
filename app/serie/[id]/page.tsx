'use client';
import ErrorEffect from "@/app/components/Error";
import LoadingEffect from "@/app/components/Loading";
import { useGetSerieDetailQuery, useGetSerieCreditsQuery } from "@/lib/features/serieDetail/serieDetailApiSlice";
import { useParams } from "next/navigation";
import SerieHeroSection from "./SerieHeroSection";
import SerieDetail from "@/type/serieDetail/SerieDetail";
import { useGetserieVideoQuery } from "@/lib/features/video/serieVideoApiSlice";
import VideoResults from "@/type/video/videoResults";
import SerieOverviewSection from "./SerieOverviewSection";
import SerieCastSection from "./SerieCastSection";
import Cast from "@/type/credits/cast";

export default function SerieDetailPage() {
    const { id } = useParams();
    const { data: serieData, isLoading, isError } = useGetSerieDetailQuery(id);
    const { data: videoData, isLoading: videoIsLoading, isError: videoIsError } = useGetserieVideoQuery(id);
    const { data: creditsData, isLoading: creditsIsLoading } = useGetSerieCreditsQuery(id);

    if (isLoading || videoIsLoading || creditsIsLoading) return (<LoadingEffect />);
    if (isError) return (<ErrorEffect message="Error! : Something went wrong" />);

    return (
        <div>
            {
                serieData && videoData && (<SerieHeroSection SerieDetail={serieData as SerieDetail} videoData={videoData.results as VideoResults[]} />)
            }
            {
                serieData && creditsData && <SerieOverviewSection serieDetail={serieData as SerieDetail} />
            }
            {
                creditsData && <SerieCastSection castData={creditsData.cast as Cast[]} />
            }
        </div>
    );
}
