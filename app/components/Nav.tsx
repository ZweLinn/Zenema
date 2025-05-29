"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/logo.module.css";


export const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-black-100 shadow-sm z-11 text-white">
      <div className="flex-1 text-2xl text-mainText">
        <a className={`btn btn-ghost text-xl ${styles.mainLogo} `}>ZENEMA</a>
      </div>
      <ul className="menu menu-horizontal px-1">
      <li><Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link></li>
      <li>
        <details>
          <summary>Movie</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><Link href='/topRatedMovie' className={pathname === "/topRatedMovie" ? "active" : ""}>TopRated</Link></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
      <div className="flex gap-2">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
            
          </div>
          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
