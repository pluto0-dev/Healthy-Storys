"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const authToken = Cookies.get("token");
const directus = new Directus("http://localhost:8055/");

const EditContent = ({ params }) => {
 const router =useRouter()
 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await directus.items("content").readByQuery({
          filter: { id: params.id },
          limit: 1,
        });

        setFormData({
          title: contentResponse.data[0].title,
          description: contentResponse.data[0].description,
        });
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [params.id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await directus.items("content").updateOne(
        params.id,
        {
          title: formData.title, 
          description: formData.description, 
        }
      );
      alert("Content created successfully");
      router.push(`/myblog/${Cookies.get("token")}`);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Check if the input is the description and limit it to 255 characters
    const newValue =
      name === "description" ? value.slice(0, 255) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : newValue,
    }));
  };


    return (
      <>
       <form onSubmit={handleFormSubmit}>
        <div className="flex justify-end mr-[300px]">
          <div className="w-[166px] h-[60px] px-10 py-2.5 rounded-md bg-[#587F61] text-white text-2xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex ">
            <input type="Submit" value="อัพเดต" className="" />
          </div>
        </div>
  
        <div className="mt-2">
          <div class="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-file"
              class="flex flex-col items-center justify-center w-[1110px] h-[504px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300  hover:bg-gray-400 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                <svg
                  class="w-8 h-8 mb-4 text-neutral-500"
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
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-xl font-normal">
                  <span className="font-semibold">or drag and drop</span>
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleInputChange}/>
            </label>
          </div>
  
          <div className="input-box flex justify-center mt-5">
            <div className="text-black text-2xl font-bold my-auto mr-5">
            ชื่อคลิป
            </div>
            <input
              type="text"
              name="title"
              placeholder="Please enter the name of your video clip"
              className="input w-[850px] h-[50px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box flex justify-start mt-5 ml-[312px]">
            <div className="text-black text-2xl font-bold  mr-[125px] ">
            คำอธิบาย
            </div>
            <textarea
              type="text"
              name="description"
              placeholder="Describe the details of your video clip."
              className="input w-[850px] h-[134px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        </form>
      </>
    );
  };
  export default EditContent;
  