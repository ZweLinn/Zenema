'use client'
import SerieDetail from "@/type/serieDetail/SerieDetail";
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SerieOverviewSection({ serieDetail }: { serieDetail: SerieDetail }) {
    const router = useRouter();
    const creators = serieDetail.created_by;

    const handleClick = (id: number | undefined) => {
        router.push(`/credit/${id}`);
    }

    return (
        <div className="my-5">
            <h1 className="text-2xl font-bold text-mainText text-center">Overview</h1>

            <div className="flex flex-col md:flex-row gap-5  ">
                <Image src={ImgPath + serieDetail.poster_path} alt={serieDetail.name} width={200} height={200} className="m-auto hidden md:block ms-10 mt-10"></Image>
                <div >
                    <p className="text-white  p-10 ">{serieDetail.overview}</p>

                    <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-2  text-start">
                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Created By :</h1>
                            <p className="text-1xl text-thirdColor hover:opacity-50 cursor-pointer">
                                {
                                    creators.length > 0 ? creators.map((creator, index) => (
                                        <span key={creator.id} onClick={() => handleClick(creator.id)}>
                                            {index > 0 && ", "}{creator.name}
                                        </span>
                                    )) : "N/A"
                                }
                            </p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Status :</h1>
                            <p className="text-1xl text-gray-400">{serieDetail.status}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">First Air Date :</h1>
                            <p className="text-1xl text-gray-400">{serieDetail.first_air_date}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Last Air Date :</h1>
                            <p className="text-1xl text-gray-400">{serieDetail.last_air_date}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Original language :</h1>
                            <p className="text-1xl text-gray-400">{serieDetail.original_language}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Number of Seasons :</h1>
                            <p className="text-1xl text-gray-400">{serieDetail.number_of_seasons}</p>
                        </div>

                        <div className="flex  gap-8 items-center">
                            <h1 className="text-1xl text-white font-bold">Number of Episodes :</h1>
                            <p className="text-1xl text-gray-400">{serieDetail.number_of_episodes}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
