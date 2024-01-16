"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Directus } from "@directus/sdk";

const VideoPlayer = ({ params }) => {
  const directus = new Directus("http://localhost:8055");
  const assetsUrl = "http://localhost:8055/assets";
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await directus.items("content").readByQuery({
          filter: { id: params.id },
        });
        setContent(contentResponse.data[0]);
        setLoading(false);
        console.log(contentResponse.data);
      } catch (error) {
        console.error("Error fetching content:", error);
        setLoading(false);
      }
    };

    fetchContent();
  }, [params.id]);

  return (
    <div className="flex justify-start mx-auto text-black mt-20">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {content && (
            <ReactPlayer
              width="990px"
              height="680px"
              controls={true}
              light={false}
              pip={true}
              url={`${assetsUrl}/${content.video}`}
              playing={true}
            />
          )}

          <div className="mx-5">
            {content && (
              <>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
