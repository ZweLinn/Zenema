'use client'
import Cast from "@/type/credits/cast";
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function CastSection({ castData }: { castData: Cast[] }) {
    const router = useRouter();
    const handleClick = (id: number) => {
        router.push(`/creditDetail/${id}`);
    }
    return (
        <div className="my-5 ">
            <h1 className="text-3xl font-bold text-white ps-10 mt-10 mb-4">Cast</h1>
            <div className="carousel rounded-box w-[90vw] ms-2 sm:ms-10 ">
                {
                    castData?.map((cast) => (
                        <div className="carousel-item flex flex-col ms-1 sm:ms-5 w-[100px] h-[200px] sm:w-[150px] sm:h-[280px] " key={cast.id} >
                            <img src={cast.profile_path !== null ? ImgPath + cast.profile_path : `https://randomavatar.com/avatar/172651974`} alt={cast.name} className="w-[100px] h-[120px] sm:w-[150px] sm:h-[200px] gap-2 sm:gap-10 object-cover  rounded-lg hover:blur-[2px] cursor-pointer" 
                            onClick={() => handleClick(cast.id)}/>
                            <h1 className="text-1xl text-white text-start w-full hover:opacity-50 cursor-pointer" onClick={() => handleClick(cast.id)}>{cast.name}</h1>
                            <h1 className="text-1xl text-gray-400 text-start w-full hover:opacity-50 cursor-pointer" onClick={() => handleClick(cast.id)}>{cast.character}</h1>
                        </div>
                    ))}

            </div>
        </div>
    )
}