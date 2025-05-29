'use client';
import TopRated from "@/type/topRatedMovie/topRated";
import TopRatedMovieResult from "@/type/topRatedMovie/topRatedResult";
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopRatedMovieLists({ topRatedMovie }: { topRatedMovie: TopRated}) {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/movieDetail/${id}`);
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10  text-center m-auto">
            {
                topRatedMovie?.results.map((movie: TopRatedMovieResult) => (
                    <div key={movie.id} className="text-center rounded-lg border-gray-400 flex flex-col items-center justify-center h-fit cursor-pointer  ">
                        <Image src={ImgPath + movie.poster_path} alt={movie.title} width={150} height={200} className="rounded-lg border-2 border-zinc-800  object-cover hover:blur-[2px]" onClick={() => handleClick(movie.id)}></Image>
                        <h1 className=" text-1xl font-semibold mt-2 hover:opacity-50 text-secondText" onClick={() => handleClick(movie.id)}>{movie.title}</h1>
                    </div>
                ))
            }
        </div>
    );
}