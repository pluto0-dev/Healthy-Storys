"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Directus } from "@directus/sdk";
import Image from 'next/image';

const ViewBlog = () => {
  const directus = new Directus("http://localhost:8055");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch blog data including image URLs from Directus
        const blogResponse = await directus.items("blog").readByQuery({ sort: ["id"] });
        setBlogs(blogResponse.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`http://localhost:3000/content/viewcontent/${blog.id}`}
          className="card card-side w-[860px] h-[350px] bg-white shadow-xl "
        >
          <figure>
            <img
              src={blog.image_url || "https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"}
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
      ))}
    </div>
  );
};

export default ViewBlog;
