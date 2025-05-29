'use client'
import Crew from "@/type/credits/crew";
import MovieDetails from "@/type/movieDetail/MovieDetails";
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MovieOverviewSection({ movieDetail , crew }: { movieDetail: MovieDetails ; crew : Crew[] } ) {
    const router = useRouter();
    const director = crew.find((person) => person.job === 'Director' && person.department === 'Directing');
    

    const handleClick = (id: number | undefined) => {
        router.push(`/creditDetail/${id}`);
    }
    
    return (
        <div className="my-5">
            <h1 className="text-2xl font-bold text-mainText text-center">Overview</h1>

            <div className="flex flex-col md:flex-row gap-5  ">
                <Image src={ImgPath + movieDetail.poster_path} alt={movieDetail.title} width={200} height={200} className="m-auto hidden md:block ms-10 mt-10"></Image>
                <div >
                    <p className="text-white  p-10 ">{movieDetail.overview}</p>

                    <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-2  text-start">
                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Director :</h1>
                            <p className="text-1xl text-thirdColor hover:opacity-50 cursor-pointer" onClick={() => handleClick(director?.id)}>{director?.name}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Release Date :</h1>
                            <p className="text-1xl text-gray-400">{movieDetail.release_date}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Original language :</h1>
                            <p className="text-1xl text-gray-400">{movieDetail.spoken_languages[0].english_name}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Budget :</h1>
                            <p className="text-1xl text-gray-400">${movieDetail.budget}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Revenue :</h1>
                            <p className="text-1xl text-gray-400">${movieDetail.revenue}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}