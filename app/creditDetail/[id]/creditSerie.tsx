import CreditsTvShow from "@/type/creditDetail/creditsTvShow";
import Image from "next/image";
import { ImgPath } from "@/util/imgPath";
import { useRouter } from "next/navigation";


export default function CreditSerie({creditSerieData}: {creditSerieData: CreditsTvShow[]}){
    const router = useRouter();
    const handleClick = (id: number) => {
        router.push(`/serieDetail/${id}`);
    }
    return (
       <div className="grid grid-cols-3 gap-5 md:grid-cols-5 mt-10 m-auto ">
                {
                 creditSerieData.map((serie) => (
                      <div key={serie.id + Math.floor(Math.random() * 1000)} className="h-fit">
                          <Image src={ImgPath + serie.poster_path} alt={serie.name} width={150} height={150} className="rounded-lg border-2 border-zinc-800  object-cover hover:blur-[1px] m-auto cursor-pointer h-fit"  onClick={() => handleClick(serie.id)}></Image>
                          <h1 className=" text-1xl font-semibold mt-2 hover:opacity-50 text-secondText text-center cursor-pointer" >{serie.name}</h1>
                          
                      </div>
                  ) )
                }
              </div>
    )
}