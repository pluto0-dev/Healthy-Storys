"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Directus } from "@directus/sdk";

const VideoPlayer = ({params}) => {
  const directus = new Directus("http://localhost:8055");
  const assetsUrl = "http://localhost:8055/assets";
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await directus.items("content").readByQuery({
          filter: { id: params.id},
        });
        setContent(contentResponse.data);
        console.log(contentResponse.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="flex justify-start mx-auto text-black">
      {content.length > 0 && (
        <ReactPlayer
          width="990px"
          height="680px"
          controls={true}
          light={false}
          pip={true}
          url={content[0].video}
          playing={true} 
        />
      )}
      {content.length > 0 && (
        <div className="mx-5">
         {/* <h1>{content[0]?.title}</h1>
          <p>{content[0]?.description}</p> */}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
