"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
const directus = new Directus("http://localhost:8055");
const assetsUrl = "http://localhost:8055/assets";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [haveBlog, setHaveBlog] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = Cookies.get("token");
        const userData = await directus.items("user").readOne(userId);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const checkBlog = async () => {
      try {
        if (isLoggedIn) {
          const userId = Cookies.get("token");
          const blogs = await directus
            .items("blog")
            .readByQuery({ filter: { user: userId } });
          setHaveBlog(blogs.data.length > 0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkBlog();
  }, [isLoggedIn]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = Cookies.get("token");
        setIsLoggedIn(!!authToken);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, [router?.pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");

  };
  const commonMenuItems = (
    <ul className="menu menu-horizontal px-1 items-center justify-center">
      <li>
        <Link href="/">หน้าหลัก</Link>
      </li>
      <li>
        <Link href="/about">เกี่ยวกับ</Link>
      </li>
    </ul>
  );

  return (
    <>
      <div className="navbar bg-[#eef2ef] fixed w-full z-10 top-0 text-black drop-shadow-md">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a className="btn btn-ghost text-2xl text-black ml-6 p-0">
            HealthStory
          </a>
          <div className="navbar-center">
          {commonMenuItems}
          {isLoggedIn && haveBlog && (
            <ul className="menu menu-horizontal px-1">
              <li className="">
                <Link href={`/myblog/${Cookies.get("token")}`}>
                  บล็อกของฉัน
                </Link>
              </li>
            </ul>
          )}
        </div>
        </div>
        
        <div className="navbar-end">
          {isLoggedIn ? (
            <>
              {isLoggedIn && haveBlog ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn bg-[#eef2ef] hover:bg-[#eef2ef] border-none shadow-none w-12 mr-14 mx-auto"
                    >
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          {user && user.image_profile ? (
                            <img
                              src={`${assetsUrl}/${user.image_profile}`}
                              alt="User Avatar"
                            />
                          ) : (
                            <img src="/profile.png" alt="Default Avatar" />
                          )}
                        </div>
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-[#eef2ef] rounded-box w-52 text-[#587F61]"
                    >
                      <li>
                        <Link href={`/profile/${Cookies.get("token")}}`}>
                          แก้ไขโปรไฟล์
                        </Link>
                      </li>
                      <li>
                        <a onClick={handleLogout}>ล็อกเอาท์</a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/blogs/create"
                    className="btn btn-ghost btn-circle text-white text-l font-bold bg-[#587F61] drop-shadow-lg w-48 mr-6 rounded-[10px] justify-center items-center gap-2.5 hover:bg-[#496950]"
                  >
                    + สร้างบล็อกข่าวของคุณ
                  </Link>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn bg-[#eef2ef] hover:bg-[#eef2ef] border-none shadow-none w-12 mr-14 mx-auto"
                    >
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src="/profile.png" />
                        </div>
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-[#eef2ef] rounded-box w-52 text-[#587F61]"
                    >
                      <li>
                        <Link href={`/profile/${Cookies.get("token")}}`}>แก้ไขโปรไฟล์</Link>
                      </li>
                      <li>
                        <a onClick={handleLogout}>ล็อกเอาท์</a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost text-black">
                ล็อกอิน
              </Link>
              <div className="ml-3">
                <Link
                  href="/register"
                  className="btn btn-ghost btn-circle text-black bg-white drop-shadow-lg w-36 mr-6"
                >
                  ลงทะเบียน
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
