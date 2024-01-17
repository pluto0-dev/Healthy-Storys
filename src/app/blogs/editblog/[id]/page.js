"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";

const editblog = ({ params }) => {
  const directus = new Directus("http://localhost:8055/");

  const [formData, setFormData] = useState({
    description: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await directus.items("blog").readByQuery({
          filter:  {id:  params.id} ,
          limit: 1,
        });

        setFormData({
          description: contentResponse.data[0].description,
        });

        //console.log(contentResponse);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the blog post data on the server
        await directus.items('blog').updateOne(params.id,
        { description: formData.description }
      );

      alert('Blog post updated successfully!');
      
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };
  const handleInputChange = (e) => {
    if (e.target.name === "file") {
      const fileName = e.target.files[0].name;
      setFormData({
        ...formData,
        bannerName: fileName,
      });
    } else {
      // Handle other input changes
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex justify-end mr-[300px] mt-6">
          <div className="w-[133px] h-[60px] item-center justify-center rounded-md bg-[#587F61] text-white text-xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex">
            <input type="submit" value="อัพเดตบล็อก" className="" />
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
                onChange={handleInputChange}
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

export default editblog;
