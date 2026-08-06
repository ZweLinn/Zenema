"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/logo.module.css";

const NAV_LINKS = [
	{
		href: "/",
		label: "Home",
	},
	{
		label: "Movie",
		children: [
			{ href: "/topRatedMovie", label: "TopRated" },
			{ href: "#", label: "Link 2" },
		],
	},
] as const;

export const Nav = () => {
	const pathname = usePathname();

	return (
		<nav className="navbar bg-base-100 shadow-sm z-10 text-white">
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
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						{NAV_LINKS.map((link) =>
							"children" in link ? (
								<li key={link.label}>
									<details>
										<summary>{link.label}</summary>
										<ul className="p-2">
											{link.children.map((child) => (
												<li key={child.href}>
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
								<li key={link.href}>
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
				<ul className="menu menu-horizontal px-1">
					{NAV_LINKS.map((link) =>
						"children" in link ? (
							<li key={link.label}>
								<details>
									<summary>{link.label}</summary>
									<ul className="bg-base-100 rounded-t-none p-2">
										{link.children.map((child) => (
											<li key={child.href}>
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
							<li key={link.href}>
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
					className="input input-bordered w-24 md:w-auto"
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
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li>
							<a>Settings</a>
						</li>
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
