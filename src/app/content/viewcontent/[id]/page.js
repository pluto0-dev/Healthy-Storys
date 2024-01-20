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
            <div style={{ width: '990px', height: '680px', backgroundColor: 'black' }} className=" ml-2">
            <ReactPlayer
              width="100%"
              height="100%"
              controls={true}
              light={false}
              pip={true}
              url={`${assetsUrl}/${content.video}`}
              playing={true}
            />
          </div>
            
          )}

          <div className="ml-10 mt-5">
            {content && (
              <>
              <div className="bg-white px-5 py-2 rounded-3xl drop-shadow-lg w-[600px]">
               <h1 className="font-bold text-3xl ">{content.title}</h1>
              </div>
                
                <div className="mt-5 bg-white px-5 py-6 text-lg w-[600px] h-[300px] rounded-3xl drop-shadow-lg overflow-x-auto " >
                  <p >{content.description}</p>
                </div>
                
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
