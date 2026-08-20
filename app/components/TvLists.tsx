'use client';
import type TvList from "@/type/tv/tvList";
import type TvResult from "@/type/tv/tvResult";
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TvLists({ tvList }: { tvList: TvList}) {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/serie/${id}`);
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-center m-auto max-w-7xl">
            {
                tvList?.results.map((tv: TvResult) => (
                    <div key={tv.id} className="rounded-lg flex flex-col items-center justify-center h-fit cursor-pointer group" onClick={() => handleClick(tv.id)}>
                        <div className="relative overflow-hidden rounded-lg border-2 border-zinc-800">
                            <Image src={ ImgPath + tv.poster_path } alt={tv.name} width={150} height={225} className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]" />
                            <div className="absolute top-2 right-2 bg-mainText text-base-300 text-xs font-bold px-2 py-1 rounded-full">
                                {tv.vote_average.toFixed(1)}
                            </div>
                        </div>
                        <h3 className="text-sm md:text-base font-semibold mt-2 text-secondText group-hover:text-mainText transition-colors duration-200">
                            {tv.name}
                        </h3>
                    </div>
                ))
            }
        </div>
    );
}
