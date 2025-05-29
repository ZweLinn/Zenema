'use client';
import ErrorEffect from "@/app/components/Error";
import LoadingEffect from "@/app/components/Loading";
import { useGetCreditsDetailQuery } from "@/lib/features/credits/creditsDetailApiSlice";
import { useParams } from "next/navigation";
import CreditOverview from "./creditOverview";
import CreditDetail from "@/type/creditDetail/creditDetail";
import { useGetCreditsExternalIdQuery } from "@/lib/features/credits/creditExternalIdApiSlice";
import ExternalIds from "@/type/creditDetail/externalIds";
import CreditMovie from "./creditMovie";
import { useState } from "react";
import CreditSerie from "./creditSerie";
import CreditPhoto from "./creditPhoto";
import { useGetCreditsMovieDetailQuery } from "@/lib/features/credits/creditsMovieApiSlice";
import CreditsMovie from "@/type/creditDetail/creditMovie";
import { useGetCreditsSeriesDetailQuery } from "@/lib/features/credits/creditsSeriesApiSlice";
import CreditsTvShow from "@/type/creditDetail/creditsTvShow";
import { useGetCreditsImageQuery } from "@/lib/features/credits/creditsImageApiSlice";
import CreditsProfile from "@/type/creditDetail/creditsProfile";

export default function Credit() {

   const { id } = useParams();
   const { data: creditDetails, isLoading, isError } = useGetCreditsDetailQuery(id);
   const { data: externalIds } = useGetCreditsExternalIdQuery(id)
   const {data : movieData , isLoading: movieIsLoading} = useGetCreditsMovieDetailQuery(id);
   const {data : serieData , isLoading: serieIsLoading} = useGetCreditsSeriesDetailQuery(id);
   const {data: imageData} = useGetCreditsImageQuery(id);
   

   const [activeTab, setActiveTab] = useState('movie');
   const [isMovie, setIsMoive] = useState(true);
   const [isSerie, setIsSerie] = useState(false);
   const [isPhoto, setIsPhoto] = useState(false);

   const handleMovieClick = () => {
      setIsMoive(true);
      setIsSerie(false);
      setIsPhoto(false);
      setActiveTab('movie');
   }
   const handleSerieClick = () => {
      setIsMoive(false);
      setIsSerie(true);
      setIsPhoto(false);
      setActiveTab('serie');
   }
   const handlePhotoClick = () => {
      setIsMoive(false);
      setIsSerie(false);
      setIsPhoto(true);
      setActiveTab('photo');
   }

   if (isLoading) return (<LoadingEffect />);
   if (isError) return (<ErrorEffect message="Error! : Something went wrong" />);

   return (
      <div>
         {
            creditDetails && externalIds && <CreditOverview creditDetails={creditDetails as CreditDetail} externalIds={externalIds as ExternalIds} />
         }
         <div className="text-2xl text-gray-400  flex gap-5 justify-center mt-10 h-full  has ">
            <h1 className={`${activeTab === 'movie' ? 'border-white border-b-2' : ''} hover:opacity-50 cursor-pointer`} onClick={handleMovieClick}>Movies</h1>
            <h1 className={`${activeTab === 'serie' ? 'border-white border-b-2' : ''} hover:opacity-50 cursor-pointer`} onClick={handleSerieClick}>TV Shows</h1>
            <h1 className={`${activeTab === 'photo' ? 'border-white border-b-2' : ''} hover:opacity-50 cursor-pointer`} onClick={handlePhotoClick}>Photos</h1>
         </div>
         {
            isMovie && !isSerie && !isPhoto &&  !movieIsLoading && <CreditMovie creditsMovieData={movieData?.cast as CreditsMovie[]} />
         }
         {
            !isMovie && isSerie && !isPhoto && <CreditSerie creditSerieData={serieData?.cast as CreditsTvShow[]} />
         }
         {
            !isMovie && !isSerie && isPhoto && <CreditPhoto imageData={imageData.profiles as CreditsProfile[]}/>
         }

      </div>
   )
}