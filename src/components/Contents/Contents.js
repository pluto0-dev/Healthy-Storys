"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Directus } from "@directus/sdk";

const Contents = (params) => {
  const directus = new Directus("http://localhost:8055");
  const assetsUrl = "http://localhost:8055/assets";
  const [content, setContent] = useState([]);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Assuming `params` contains the user ID
        const contentResponse = await directus.items("content").readByQuery({ blog: params.id });
        setContent(contentResponse.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [params.id]);
  return (
    <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
      {content.map((content) => (
        <Link
          key={content.id}
          href={`http://localhost:3000/content/viewcontent/${content.id}`}
          className="card card-side w-[860px] h-[350px] bg-white shadow-xl "
        >
          <figure>
            <img
              src={`${assetsUrl}/${content.preview}`}
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
  );
};

export default Contents;
