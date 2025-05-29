import CreditsProfile from "@/type/creditDetail/creditsProfile";


export default function CreditPhoto({imageData}: {imageData : CreditsProfile[]}) {
    console.log('imageData', imageData);
    
    return (
        <div className="mt-20">
            {
                imageData && imageData.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {imageData.map((image) => (
                            <div key={image.file_path} className="h-fit">
                                <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt="Credit Photo" className="rounded-lg border-2 border-zinc-800 object-cover hover:blur-[1px] m-auto cursor-pointer h-fit" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No photos available</p>
                )
            }
        </div>
    )
}