'use client';
import NowPlaying from "@/type/movies/nowPlaying/nowPlaying";
import NowPlayingResult from "@/type/movies/nowPlaying/nowPlayingResult";
import UpComing from "@/type/movies/upComing/upComing";
import UpComingMovieResult from "@/type/movies/upComing/upComingResult";
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UpComingMovieLists({ upComing }: { upComing: UpComing}) {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/movie/${id}`);
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-center m-auto max-w-7xl">
            {
                upComing?.results.map((movie: UpComingMovieResult) => (
                    <div key={movie.id} className="rounded-lg flex flex-col items-center justify-center h-fit cursor-pointer group" onClick={() => handleClick(movie.id)}>
                        <div className="relative overflow-hidden rounded-lg border-2 border-zinc-800">
                            <Image src={ImgPath + movie.poster_path} alt={movie.title} width={150} height={225} className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]" />
                            <div className="absolute top-2 right-2 bg-mainText text-base-300 text-xs font-bold px-2 py-1 rounded-full">
                                {movie.vote_average.toFixed(1)}
                            </div>
                        </div>
                        <h3 className="text-sm md:text-base font-semibold mt-2 text-secondText group-hover:text-mainText transition-colors duration-200">
                            {movie.title}
                        </h3>
                    </div>
                ))
            }
        </div>
    );
}
