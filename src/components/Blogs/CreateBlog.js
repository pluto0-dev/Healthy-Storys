"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";


const directus = new Directus("http://localhost:8055/");

const CreateBlog = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: "",
    banner: "",
    bannerName: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      banner: formData.file,
      bannerName: file.name,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!Cookies.get("token")) {
      console.error("User ID is missing or invalid.");
      // Display a message on the UI or redirect to login
      return;
    }

  
    try {
      // Now create the blog entry with the file ID
      const blogResponse = await directus.items("blog").createOne({
        user: {
          id: Cookies.get("token"),
        },
        banner: formData.file,
        description: formData.description,
      });
  
      console.log("Data sent to Directus:", blogResponse);
  
      router.push("/");
      setTimeout(() => {
        window.location.reload();
    }, 100)
    } catch (error) {
      console.error("Error sending data to Directus:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex justify-end mr-[300px] mt-6">
          <div className="w-[133px] h-[60px] item-center justify-center rounded-md bg-[#587F61] text-white text-xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex">
            <input type="submit" value="สร้างบล็อก" className="" />
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-[1110px] h-[504px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-neutral-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-5xl font-normal">
                  <span className="font-semibold">เพิ่มรูปภาพ</span>
                </p>
                <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-xl font-normal">
                  <span className="font-semibold">หรือลากและวาง</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                name="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {formData.bannerName && (
                <p className="text-black text-xl mt-2">
                  File Selected: {formData.bannerName}
                </p>
              )}
            </label>
          </div>
          <div className="input-box flex justify-start mt-5 ml-[312px]">
            <div className="text-black text-2xl font-bold  mr-[125px] ">
            คำอธิบาย
            </div>
            <textarea
              type="text"
              placeholder="อธิบายรายละเอียดบล็อกของคุณ"
              className="input w-[850px] h-[134px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
