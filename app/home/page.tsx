"use client";

import { useGetTopRatedMoviesQuery } from "@/lib/features/movie/topRatedMovieApiSlice";
import type TopRated from "@/type/movies/topRated/topRated";
import type TopRatedMovieResult from "@/type/movies/topRated/topRatedResult";
import { ImgPath } from "@/util/imgPath";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WelcomeHero from "../components/WelcomeHero";
import LoadingEffect from "../components/Loading";
import ErrorEffect from "../components/Error";

export default function HomePage() {
	const router = useRouter();
	const { data, isLoading, isError } = useGetTopRatedMoviesQuery(1);

	const handleMovieClick = (id: number) => {
		router.push(`/movie/${id}`);
	};

	return (
		<div>
			<WelcomeHero />

			<section className="px-4 md:px-8 lg:px-16 py-12">
				<h2 className="text-2xl md:text-3xl font-bold text-mainText text-center mb-10">
					Featured Movies
				</h2>

				{isLoading && <LoadingEffect />}

				{isError && (
					<ErrorEffect message="Error! : Something went wrong loading featured movies." />
				)}

				{data && (data as TopRated).results.length === 0 && (
					<p className="text-center text-secondText/60">
						No featured movies available.
					</p>
				)}

				{data && (data as TopRated).results.length > 0 && (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-center m-auto max-w-7xl">
						{(data as TopRated).results
							.slice(0, 10)
							.map((movie: TopRatedMovieResult) => (
								<div
									key={movie.id}
									className="rounded-lg flex flex-col items-center justify-center h-fit cursor-pointer group"
									onClick={() => handleMovieClick(movie.id)}
								>
									<div className="relative overflow-hidden rounded-lg border-2 border-zinc-800">
										<Image
											src={ImgPath + movie.poster_path}
											alt={movie.title}
											width={150}
											height={225}
											className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px]"
										/>
										<div className="absolute top-2 right-2 bg-mainText text-base-300 text-xs font-bold px-2 py-1 rounded-full">
											{movie.vote_average.toFixed(1)}
										</div>
									</div>
									<h3 className="text-sm md:text-base font-semibold mt-2 text-secondText group-hover:text-mainText transition-colors duration-200">
										{movie.title}
									</h3>
								</div>
							))}
					</div>
				)}
			</section>
		</div>
	);
}
