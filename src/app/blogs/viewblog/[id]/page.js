"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import Link from "next/link";
const Blogs = ({ params }) => {
  const directus = new Directus("http://localhost:8055");
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await directus.items("user").readByQuery({
          filter: { id: params.id },
          limit: 1,
        });
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogResponse = await directus.items("blog").readByQuery({
          filter: { user: params.id },
          limit: 1,
        });
        setBlogs(blogResponse.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch content for the specific user's blogs
        const blogIds = blogs.map(blog => blog.id);
        const contentResponse = await directus.items("content").readByQuery({
          filter: { blog: { id: { _in: blogIds } } },
        });
        setContent(contentResponse.data);
        console.log(contentResponse.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [blogs]);

  

  return (
    <>
      <div
        className="flex items-center justify-center bg-white h-[640px]"
        style={{
          backgroundImage: `url('${""}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
        }}
      >
        <div className="absolute left-0 ml-5 mt-[400px]">
          <div className="font-bold text-2xl text-black">
            {user[0]?.username}
          </div>
          <div className="mt-5 text-black">{blogs[0]?.description}</div>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
          {content.map((content) => (
            <Link
              key={content.id}
              href={`http://localhost:3000/content/viewcontent/${content.id}`}
              className="card card-side w-[860px] h-[350px] bg-white shadow-xl "
            >
              <figure>
                <img
                  src={
                    "https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                  }
                  alt="imgvideo"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-xl text-black">
                  {content.title}
                </h2>
                <p className="card-description text-black">
                  {content.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
