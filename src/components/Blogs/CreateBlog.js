"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";


const directus = new Directus("http://localhost:8055/");

const CreateBlog = () => {
  const authToken = Cookies.get("token")
  const router = useRouter();
  const [isHavefile, setIsHavefile] = useState(false);
  const [imageFilePreviews, setImageFilePreviews] = useState([]);
  const [formData, setFormData] = useState({
    description: "",

  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Now create the blog entry with the file ID
      const blogResponse = await directus.items("blog").createOne({
        user: {
          id: Cookies.get("token"),
        },
        banner: imageId,
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
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevUser) => ({ ...prevUser, [name]: type === 'file' ? files[0] : value }));
  };  

  const handleImageChange = async (e) => {
    const { name, files, type } = e.target;
  
    if (name === "banner" && files.length > 0) {
      const imageFile = files[0];
      setFormData((prevData) => ({ ...prevData, preview: imageFile.name }));
     // setIsHaveimage(true);
      setImageFilePreviews([{ type: "image", file: imageFile }]);
      const fileUploadResponse = await uploadImage(imageFile);
      console.log('file upload', fileUploadResponse);
    } else {
      setIsHavefile(false);
      //setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const [imageId, setImageId] = useState();
  const appId = authToken

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      const blob = new Blob([file], { type: file.type });
      formData.append("file", blob, file.name);
      formData.append("appId", appId);
      formData.append("storage", "local");

      const fileUploadResponse = await directus.files.createOne(formData, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("File upload response:", fileUploadResponse);

      setImageId(fileUploadResponse.id);
      return fileUploadResponse.id;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
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
              htmlFor="dropzone-image"
              className="flex flex-col items-center justify-center w-[1110px] h-[504px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400"
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
                id="dropzone-image"
                name="banner"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              
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
