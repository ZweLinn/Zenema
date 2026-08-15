'use client';
import CreditsTvShow from "@/type/creditDetail/creditsTvShow";
import Image from "next/image";
import { ImgPath } from "@/util/imgPath";
import { useRouter } from "next/navigation";


export default function CreditSerie({creditSerieData}: {creditSerieData: CreditsTvShow[]}){
    const router = useRouter();
    const handleClick = (id: number) => {
        router.push(`/serie/${id}`);
    }
    return (
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-center m-auto max-w-7xl mt-10">
                {
                 creditSerieData.map((serie) => (
                      <div key={serie.id + Math.floor(Math.random() * 1000)} className="rounded-lg flex flex-col items-center justify-center h-fit cursor-pointer group" onClick={() => handleClick(serie.id)}>
                          <div className="relative overflow-hidden rounded-lg border-2 border-zinc-800">
                              <Image src={serie.poster_path !== null ? ImgPath + serie.poster_path : `https://randomavatar.com/avatar/172651974`} alt={serie.name} width={150} height={225} className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]" />
                              <div className="absolute top-2 right-2 bg-mainText text-base-300 text-xs font-bold px-2 py-1 rounded-full">
                                  {serie.vote_average.toFixed(1)}
                              </div>
                          </div>
                          <h3 className="text-sm md:text-base font-semibold mt-2 text-secondText group-hover:text-mainText transition-colors duration-200">
                              {serie.name}
                          </h3>
                      </div>
                  ) )
                }
              </div>
    )
}
