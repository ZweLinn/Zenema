'use client';
import { useGetMovieDetailQuery } from "@/lib/features/movieDetail/movieDetailApiSlice";
import { useParams } from "next/navigation";
import MovieHeroSection from "./MovieHeroSection";
import { useGetVideoQuery } from "@/lib/features/video/videoApiSlice";
import VideoResults from "@/type/video/videoResults";
import LoadingEffect from "@/app/components/Loading";
import ErrorEffect from "@/app/components/Error";
import MovieOverviewSection from "./MovieOverviewSection";
import { useGetCreditsQuery } from "@/lib/features/credits/creditsApiSlice";
import Crew from "@/type/credits/crew";
import CastSection from "./MovieCastSection";
import Cast from "@/type/credits/cast";

export default function MovieDetail() {
    const { id } = useParams();
    const { data: movieDetail, isError, isLoading } = useGetMovieDetailQuery(id);
    const { data: videoData, isError: videoIsError, isLoading: videoIsLoading } = useGetVideoQuery(id);
    const { data: creditsData, isError: creditsIsError, isLoading: creditsIsLoading } = useGetCreditsQuery(id);


    if (isLoading && videoIsLoading && creditsIsLoading) return (<LoadingEffect />);
    if (isError) return (<ErrorEffect message="Error! : Something went wrong" />);
    return (
        <div>
            {/* <p className="mt-4">Movie ID is: {id}</p> */}
            {
                movieDetail && videoData && <MovieHeroSection movieDetail={movieDetail} videoData={videoData.results as VideoResults[]} />
            }
            {
                movieDetail && creditsData && <MovieOverviewSection movieDetail={movieDetail} crew={creditsData?.crew as Crew[]} />
            }
            
            {
                creditsData && <CastSection castData={creditsData.cast as Cast[]} />
            }
         
        </div>
    );
}