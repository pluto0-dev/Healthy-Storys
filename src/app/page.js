'use client'
import React, { useState, useEffect } from "react";
import User from "@/components/user/User";
import { Directus } from "@directus/sdk";

const Home = () => {
  const directus = new Directus("http://localhost:8055");
  const [user, setUser] = useState();
  const [searchValue, setSearchValue] = useState("");

  const fetchUser = async () => {
    try {
      const userResponse = await directus.items("content").readByQuery({
        filter: { username: searchValue },
      });
      setUser(userResponse.data[0]);
      console.log(userResponse.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [searchValue]);

  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen mt-28">
        <p className="mb-4 text-black text-[32px] font-semibold font-['Inter']">
          สามารถค้นหาบล็อกข่าวที่คุณสนใจได้ที่นี่
        </p>
        
        <User />
      </div>
    </>
  );
};

export default Home;
