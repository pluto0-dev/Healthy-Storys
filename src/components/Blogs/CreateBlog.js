"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";

const directus = new Directus("http://localhost:8055/"); // Update the URL to your Directus API endpoint

const CreateBlog = () => {
  const router = useRouter();
  const userID = Cookies.get("token");

  const [formData, setFormData] = useState({
    user: {
      id: null
    },
    banner: null,
    bannerName: "",
    details: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await directus.items("user").readOne(userID);
        setFormData((prevData) => ({ ...prevData, user }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userID) {
      fetchUser();
    }
  }, [userID]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      banner: file,
      bannerName: file?.name || ""
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("user", formData.user.id);
      formDataToSend.append("details", formData.details);
      formDataToSend.append("banner", formData.banner);

      const response = await directus.items("blog").createOne(formDataToSend);

      console.log("Content created successfully:", response);

      setFormData({
        user: {
          id: null
        },
        banner: null,
        bannerName: "",
        details: ""
      });

      router.push("/");
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex justify-end mr-[300px]">
          <div className="w-[133px] h-[60px] item-center justify-center rounded-md bg-[#587F61] text-white text-xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex">
            <input type="submit" value="save blog" className="" />
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
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="mb-2 w-[354.36px] text-center text-neutral-500 text-xl font-normal">
                  <span className="font-semibold">or drag and drop</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                name="dropzone"
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
              Details
            </div>
            <textarea
              type="text"
              placeholder="Describe the details of your video clip."
              className="input w-[850px] h-[134px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
              required
              name="details"
              value={formData.details}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
