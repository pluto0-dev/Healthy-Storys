// Navbar.js
"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import { useRouter } from "next/navigation"; // Correct import
import Cookies from "js-cookie";
import Link from "next/link";

const directus = new Directus("http://localhost:8055/");

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = Cookies.get("token");

        if (authToken) {
          // You can make an API call to verify the token on the server
          // For simplicity, assuming the token is valid for now
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, [router.pathname]); // Add router.pathname to dependencies

  const handleLogout = () => {
    // Clear the authentication cookie and update the state
    Cookies.remove("token");
    setIsLoggedIn(false);
    // Redirect to the login page
    router.push("/login");
  };
  return (
    <div className="navbar bg-[#eef2ef] fixed w-full z-10 top-0 text-black">
      <div className="navbar-start">
        <div className="dropdown"></div>
        <a className="btn btn-ghost text-2xl text-black ml-6 p-0">
          HealthStory
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <>
          <Link
                href="/blogs/create"
                className="btn btn-ghost btn-circle text-white text-l font-bold bg-[#587F61] drop-shadow-lg w-48 mr-6 rounded-[10px] justify-center items-center gap-2.5 hover:bg-[#496950]"
              >
                + Create your news blog
              </Link>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn bg-[#eef2ef] hover:bg-[#eef2ef] border-none shadow-none w-12 mr-14 mx-auto">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-[#eef2ef] rounded-box w-52 text-[#587F61]"
              >
                <li>
                  <Link href={`/profile/1`}>Edit Profile</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost text-black">
              Login
            </Link>
            <div className="ml-3">
              <Link
                href="/register"
                className="btn btn-ghost btn-circle text-black bg-white drop-shadow-lg w-36 mr-6"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
