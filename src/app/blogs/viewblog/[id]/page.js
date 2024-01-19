"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import Link from "next/link";
const Blogs = ({ params }) => {
  const directus = new Directus("http://localhost:8055");
  const assetsUrl = "http://localhost:8055/assets";
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
        //console.log(blogResponse.data)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const blogIds = blogs.map((blog) => blog.id);
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
          backgroundImage: `url('${assetsUrl}/${blogs[0]?.banner}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
        }}
      >
        <div className="absolute left-0 mx-10 mt-[400px]">
          <div className="flex items-center">
            <div className="bg-[#EEF2EF] px-4 py-1 rounded-2xl">
              <div className="font-bold text-2xl text-black">
                {user[0]?.username}
              </div>
            </div>
          </div>
          <div className="flex items-center ">
            <div className="bg-[#EEF2EF] px-3 py-2 rounded-2xl mt-5 text-balance overflow-auto h-28 w-[400px]">
              <div className=" text-black">{blogs[0]?.description}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <div className="grid grid-cols-1 gap-4 mt-6 mx-auto">
          {content.map((content) => (
            <Link
              key={content.id}
              href={`http://localhost:3000/content/viewcontent/${content.id}`}
              className="card card-side w-[860px] h-[350px] bg-white shadow-xl  my-2"
            >
              <figure>
                <img src={`${assetsUrl}/${content.preview}`} alt="imgvideo" className="bg-black bg-cover h-full w-96"/>
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-xl text-black">
                  {content.title}
                </h2>
                <p className="card-description text-black ">
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
