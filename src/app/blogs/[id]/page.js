"use client";
import { useState, useEffect } from "react";
import BlogList from "@/components/Blogs/BlogList";
const Blogs = ({ params }) => {
  const [user, setUser] = useState([]);
  const { id } = params;
  useEffect(() => {
    fetch(`https://659836a7668d248edf244d28.mockapi.io/user/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  return (
    <>
     <div
      className="flex items-center justify-center bg-black h-[640px]"
      style={{
        backgroundImage: `url('${user.avatar}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
      }}
    >
      <div className="absolute left-0 ml-5 mt-[400px] ">
        <div className="font-bold text-2xl text-black">{user.username}</div>
        <div className="mt-5 text-black">{user.description}</div>
      </div>
      
    </div>
    <div className="flex items-end justify-end">
    <BlogList />
  </div>
    </>
   
  );
};
export default Blogs;
