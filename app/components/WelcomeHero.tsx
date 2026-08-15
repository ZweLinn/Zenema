
import styles from "../styles/logo.module.css";

export default function WelcomeHero() {
	return (
		<section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-base-300 via-base-100 to-base-300 overflow-hidden">
			{/* Decorative glowing orbs */}
			<div className="absolute top-10 left-1/4 w-72 h-72 bg-mainText/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-10 right-1/4 w-96 h-96 bg-thirdColor/10 rounded-full blur-3xl pointer-events-none" />

			<div className="relative z-10 animate-fade-in">
				<h1
					className={`${styles.mainLogo} text-6xl md:text-8xl lg:text-9xl font-bold text-mainText tracking-widest drop-shadow-lg`}
				>
					ZENEMA
				</h1>
				<p className="mt-4 text-xl md:text-2xl text-secondText/80 font-light tracking-wide">
					Your Gateway to Cinema
				</p>
				<p className="mt-2 max-w-xl mx-auto text-sm md:text-base text-secondText/60">
					Discover top-rated movies, explore detailed insights, and immerse
					yourself in the world of film — all in one place.
				</p>
			</div>
		</section>
	);
}
