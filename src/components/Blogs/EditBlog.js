"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Directus } from "@directus/sdk";
import { MoreHorizontal,Edit, Trash2 } from 'react-feather';

const EditBlog = () => {
  const directus = new Directus("http://localhost:8055");
  const [blogs, setBlogs] = useState([]);

  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogResponse = await directus
          .items("blog")
          .readByQuery({ sort: ["id"] });
        setBlogs(blogResponse.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative">
            <Link
              href={`/viewblog/${blog.id}`}
              className="card card-side w-[860px] h-[350px] bg-white shadow-xl "
            >
              <figure>
                <img
                  src={
                    blog.image_url ||
                    "https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                  }
                  alt="imgvideo"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-xl text-black">
                  {blog.title}
                </h2>
                <p className="card-description text-black">
                  {blog.description}
                </p>
              </div>
            </Link>
            <div className="absolute top-0 end-0 p-4 ">
            <div className="dropdown dropdown-rigt">
                <button className="btn m-1 icon bg-white text-black border-none shadow-none hover:bg-white  ">
                  <MoreHorizontal />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-1 shadow text-black bg-white rounded-box w-52 "
                >
                  <li>
                    <a>
                      แก้ไข
                    </a>
                  </li>
                  <li>
                    <a>
                     ลบ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditBlog;
