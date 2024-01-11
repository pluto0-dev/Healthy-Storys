"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const BlogList = () => {
  const [blog, setblog] = useState([]);

  useEffect(() => {
    fetch("https://659836a7668d248edf244d28.mockapi.io/user")
      .then((res) => res.json())
      .then((result) => {
        setblog(result);
      });
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
        {blog.map((blog, index) => (
          <Link
            key={index}
            href={`/viewblog/${blog.id}`}
            className="card card-side w-[860px] h-[350px] bg-white shadow-xl "
          >
              <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="imgvideo"/></figure>
            <div className="card-body ">
              <h2 className="card-title font-bold text-xl text-black">
                {blog.nameVideo}
              </h2>
              <p className="card-title font-bold text-xl text-black">
                {blog.descriptionVideo}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default BlogList;
