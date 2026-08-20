"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "../styles/logo.module.css";

const NAV_LINKS = [
	{ id: "home", href: "/", label: "Home" },
	{
		id: "movies",
		label: "Movies",
		children: [
			{ id: "movies-top-rated", href: "/movies/topRated", label: "Top Rated" },
			{ id: "movies-now-playing", href: "/movies/nowPlaying", label: "Now Playing" },
			{ id: "movies-upcoming", href: "/movies/upcoming", label: "Upcoming" },
			{ id: "movies-popular", href: "/movies/popular", label: "Popular" },
		],
	},
	{
		id: "tv-shows",
		label: "TV Shows",
		children: [
			{ id: "tv-top-rated", href: "/tv/topRated", label: "Top Rated" },
			{ id: "tv-on-air", href: "/tv/onAir", label: "On Air" },
			{ id: "tv-popular", href: "/tv/popular", label: "Popular" },
		],
	},
	{
		id: "genres",
		label: "Genres",
		children: [
			{ id: "genre-action", href: "#", label: "Action" },
			{ id: "genre-comedy", href: "#", label: "Comedy" },
			{ id: "genre-drama", href: "#", label: "Drama" },
			{ id: "genre-horror", href: "#", label: "Horror" },
			{ id: "genre-sci-fi", href: "#", label: "Sci-Fi" },
		],
	},
	{ id: "trending", href: "#", label: "Trending" },
] as const;

export const Nav = () => {
	const pathname = usePathname();
	const [openDesktop, setOpenDesktop] = useState<number | null>(null);
	const [openMobile, setOpenMobile] = useState<number | null>(null);

	const handleDesktopToggle = (index: number) => {
		setOpenDesktop((prev) => (prev === index ? null : index));
	};

	const handleMobileToggle = (index: number) => {
		setOpenMobile((prev) => (prev === index ? null : index));
	};

	return (
		<nav className="navbar bg-base-100 shadow-sm z-50 text-white sticky top-0">
			{/* ── Left: logo + mobile hamburger ── */}
			<div className="navbar-start">
				{/* Mobile dropdown — visible below lg breakpoint */}
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-56 p-2 shadow-xl border border-base-300"
					>
						{NAV_LINKS.map((link, i) =>
							"children" in link ? (
								<li key={link.id}>
									<details
										open={openMobile === i}
										onClick={(e) => {
											e.preventDefault();
											handleMobileToggle(i);
										}}
									>
										<summary>{link.label}</summary>
										<ul>
											{link.children.map((child) => (
												<li key={child.id}>
													<Link
														href={child.href}
														className={pathname === child.href ? "active" : ""}
													>
														{child.label}
													</Link>
												</li>
											))}
										</ul>
									</details>
								</li>
							) : (
								<li key={link.id}>
									<Link
										href={link.href}
										className={pathname === link.href ? "active" : ""}
									>
										{link.label}
									</Link>
								</li>
							),
						)}
					</ul>
				</div>

				{/* Logo — always visible, navigates to / */}
				<Link href="/" className={`btn btn-ghost text-xl ${styles.mainLogo}`}>
					ZENEMA
				</Link>
			</div>

			{/* ── Center: desktop horizontal menu ── */}
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gap-1">
					{NAV_LINKS.map((link, i) =>
						"children" in link ? (
							<li key={link.id}>
								<details
									open={openDesktop === i}
									onClick={(e) => {
										e.preventDefault();
										handleDesktopToggle(i);
									}}
								>
									<summary>{link.label}</summary>
									<ul className="bg-base-200 rounded-box z-[1] p-2 shadow-xl border border-base-300 min-w-40">
										{link.children.map((child) => (
											<li key={child.id}>
												<Link
													href={child.href}
													className={pathname === child.href ? "active" : ""}
												>
													{child.label}
												</Link>
											</li>
										))}
									</ul>
								</details>
							</li>
						) : (
							<li key={link.id}>
								<Link
									href={link.href}
									className={pathname === link.href ? "active" : ""}
								>
									{link.label}
								</Link>
							</li>
						),
					)}
				</ul>
			</div>

			{/* ── Right: search + avatar dropdown ── */}
			<div className="navbar-end flex gap-2">
				<input
					type="text"
					placeholder="Search"
					className="input input-bordered input-sm w-24 md:w-auto"
				/>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img
								alt="User avatar"
								src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							/>
						</div>
					</div>

					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-300"
					>
						<li>
							<button type="button" className="justify-between">
								Profile
								<span className="badge badge-sm">New</span>
							</button>
						</li>
						<li>
							<button type="button">Settings</button>
						</li>
						<li className="menu-title">Account</li>
						<li>
							<button type="button">Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
