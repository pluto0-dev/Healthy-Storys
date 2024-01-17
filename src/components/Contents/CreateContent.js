"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";

const authToken = Cookies.get("token");
const directus = new Directus("http://localhost:8055/");

const CreateContent = ({ params }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    videoClipName: "",
    details: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const userBlog = await directus.items("blog").readByQuery({
        filter: { user: authToken },
        limit: 1,
      });

      const response = await directus.items("content").createOne({
        blog: userBlog.data[0].id,
        title: formData.videoClipName,
        description: formData.details,
      });

      console.log("Content created successfully:", response);

      alert("Content created successfully");
      router.push(`/myblog/${Cookies.get("token")}`);
      setFormData({
        videoClipName: "",
        details: "",
      });
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex justify-end mr-[300px] mt-16">
        <div className="item-center justify-center w-[133px] h-[60px] rounded-md bg-[#587F61] text-white text-2xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex">
          <input type="submit" value="โพสต์" className="" />
        </div>
      </div>

      <div className="mt-2">
        <div className="inline-flex items-center mx-[260px]">
        <div className="items-center justify-center mx-5">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[547px] h-[433px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              
              <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-5xl font-normal">
                <span className="font-semibold">เพิ่มรูปภาพ</span>
              </p>
              <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-xl font-normal">
                <span className="font-semibold">หรือลากและวาง</span>
              </p>
            </div>
            <input
              id="dropzone-file"
              name="preview"
              type="file"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[547px] h-[433px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              
              <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-5xl font-normal">
                <span className="font-semibold">เพิ่มวิดีโอ</span>
              </p>
              <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-xl font-normal">
                <span className="font-semibold">หรือลากและวาง</span>
              </p>
            </div>
            <input
              id="dropzone-file"
              name="video"
              type="file"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        </div>
        </div>
        <div className="input-box flex justify-center mt-5">
          <div className="text-black text-2xl font-bold my-auto mr-[120px]">
            ชื่อคลิป
          </div>
          <input
            type="text"
            placeholder="กรุณากรอกชื่อคลิปวิดีโอของคุณ"
            className="input w-[850px] h-[50px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
            required
            name="videoClipName"
            value={formData.videoClipName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-box flex justify-start mt-5 ml-[319px]">
          <div className="text-black text-2xl font-bold  mr-[96px] ">
            คำอธิบาย
          </div>
          <textarea
            type="text"
            placeholder="อธิบายรายละเอียดคลิปวิดีโอของคุณ"
            className="input w-[850px] h-[134px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
            required
            name="details"
            value={formData.details}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateContent;
