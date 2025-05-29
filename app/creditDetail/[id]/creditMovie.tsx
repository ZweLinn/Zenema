'use client';
import CreditsMovie from "@/type/creditDetail/creditMovie";
import Image from "next/image";
import { ImgPath } from "@/util/imgPath";
import { useRouter } from "next/navigation";

export default function CreditMovie({creditsMovieData}: {creditsMovieData: CreditsMovie[]}){
    const router = useRouter();
    const handleClick = (id: number) => {
        router.push(`/movieDetail/${id}`);
    }
    return (
        <div className="grid grid-cols-3 gap-5 md:grid-cols-5 mt-10 m-auto ">
          {
            creditsMovieData.map((movie) => (
                <div key={movie.id  + Math.floor(Math.random() * 1000)} className="h-fit">
                    <Image src={ImgPath + movie.poster_path} alt={movie.title} width={150} height={150} className="rounded-lg border-2 border-zinc-800  object-cover hover:blur-[1px] m-auto cursor-pointer h-fit" onClick={() => handleClick(movie.id)}></Image>
                    <h1 className=" text-1xl font-semibold mt-2 hover:opacity-50 text-secondText text-center cursor-pointer" onClick={() => handleClick(movie.id)}>{movie.title}</h1>
                    
                </div>
            ) )
          }
        </div>
    )
}