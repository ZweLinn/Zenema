'use client'
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import VideoModal from "@/app/components/VideoModal";
import VideoResults from "@/type/video/videoResults";
import SerieDetail from "@/type/serieDetail/SerieDetail";


export default function SerieHeroSection({ SerieDetail , videoData }: { SerieDetail: SerieDetail ; videoData: VideoResults[] }) {
    const [activeVideoKey, setActiveVideoKey] = useState<null | string>(null);
    
   console.log('videoData', videoData);
   
    
    const handleVideoClick = () => {
       {
        videoData.map((video) => {
            if(video.type === 'Trailer'){
                setActiveVideoKey(video.key);
                return
            }
        })
       }
    }
    return (
        <section className="relative w-full h-[450px]  bg-black flex items-center">
            {/* Left Content */}
            <div className="z-10 w-full md:w-1/2 px-8 md:px-16 text-white">
                <h1 className="text-3xl md:text-5xl text-mainText font-bold mb-4 mt-5 sm: ">{SerieDetail.name}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                {
                    SerieDetail.genres.map((genre) => (
                        <p key={genre.id} className="text-1xl  md:text-md hover:opacity-50 cursor-pointer bg-slate-900 ps-2 " >{genre.name} &nbsp;</p>))
                }
                </div>

                {/* Rating and Details */}
                <div className="flex flex-col  md:flex-row space-x-4 text-green-400 mb-2 md:mb-4">
                    <div className="flex text-start">
                        {
                            SerieDetail.vote_average > 0 ? <span className="text-thirdColor text-2xl font-bold">{SerieDetail.vote_average}</span> : <span className="text-red-400 text-2xl font-bold">N/A</span>
                        }
                    </div>

                    <span className="text-gray-400 text-sm item-center pt-2">{SerieDetail.first_air_date.slice(0, 4)}</span>
                    <span className="text-gray-400 text-sm pt-2">Season {SerieDetail.number_of_seasons}</span>
                    {/* <span className="text-gray-400 text-sm">Cert. R</span> */}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 md:mb-8 max-w-lg">
                    {SerieDetail.overview}
                </p>

                {/* Watch Trailer Button */}
                <div className="flex flex-col md:flex-row items-start space-x-4 mb-8 gap-2 md:gap-0">
                    <button className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 transition px-6 py-3 rounded" onClick={handleVideoClick} >
                        <FaPlay />
                        <span className="text-white font-semibold">Trailer</span>
                    </button>
                </div>
            </div>

            {/* Right Image */}
            <div className="absolute  left-0 right-0 md:left-auto top-0 w-full md:w-1/2  h-full">
                <Image src={ImgPath + SerieDetail.backdrop_path} alt="Movie" className="w-full h-full object-cover" width={300} height={200}></Image>
                <div className="absolute inset-0  bg-gradient-to-r from-black to-transparent" />
            </div>
            <VideoModal videoKey={activeVideoKey } onClose={() => setActiveVideoKey(null)} />
        </section>
    );
}