import CreditDetail from "@/type/creditDetail/creditDetail";
import { ImgPath } from "@/util/imgPath";
import { ImdbPath2 } from "@/util/ImdbPath";
import { XPath } from "@/util/externalIdsPath";
import { InstaPath } from "@/util/externalIdsPath";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaImdb } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaInstagramSquare } from "react-icons/fa";
import ExternalIds from "@/type/creditDetail/externalIds";

export default function CreditOverview({ creditDetails, externalIds }: { creditDetails: CreditDetail; externalIds: ExternalIds }) {

    return (
        <div >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <h1 className="text-2xl font-bold text-center text-mainText my-6">{creditDetails.name}</h1>
                <p className="">({creditDetails.birthday.slice(0, 4)} - {creditDetails.deathday ? creditDetails.deathday.slice(0, 4) : 'Present'})</p>
            </div>

            <div className="flex flex-col   sm:flex-row gap-10">
               
                <div className="w-[250px] mt-2">
                    <Image src={ImgPath + creditDetails.profile_path} alt={creditDetails.name} width={250} height={200} className="ms-10 rounded object-cover m-auto "></Image>
                </div>
                <div className="w-full">
                    <p className="ps-5">{creditDetails.biography}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10 ps-5">
                        <p><b>Known For: </b> {creditDetails.known_for_department}</p>

                        <p> <b> Birth of Place: </b> {creditDetails.place_of_birth}</p>
                        <p> <b> Born : </b> {creditDetails.birthday}</p>
                    </div>
                    <div className="flex gap-3 mt-10 ps-5">
                        <Link href={ImdbPath2 + creditDetails.imdb_id} ><FaImdb className="text-2xl hover:opacity-50 text-white" /></Link>
                        {
                            creditDetails.homepage && <Link href={creditDetails.homepage} ><TbWorld className="text-2xl hover:opacity-50 text-white" /></Link>
                        }
                        {
                            externalIds.twitter_id && <Link href={XPath + externalIds.twitter_id} ><FaXTwitter className="text-2xl hover:opacity-50 text-white" /></Link>
                        }
                        {
                            externalIds.instagram_id && <Link href={InstaPath + externalIds.instagram_id} ><FaInstagramSquare className="text-2xl hover:opacity-50 text-white" /></Link>
                        }
                    </div>
                </div>

            </div>


        </div>
    )
}