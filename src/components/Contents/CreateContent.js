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
  const [isHavefile, setIsHavefile] = useState(false);
  const [isHaveImage, setIsHaveimage] = useState(false);
  const [imageFilePreviews, setImageFilePreviews] = useState([]);
  const [videoFilePreviews, setVideoFilePreviews] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const userBlog = await directus.items("blog").readByQuery({
        filter: { user: authToken },
        limit: 1,
      });

      

      const contentData = {
        blog: userBlog.data[0].id,
        title: formData.videoClipName,
        description: formData.details,
      };

      await directus.items("content").createOne(contentData);

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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "preview" && files.length > 0) {
      const file = files[0];
      const fileType = file.type.split("/")[0];

      if (fileType === "image") {
        // Set the selected file name in the state for preview
        //setFormData((prevData) => ({ ...prevData, bannerName: file.name }));
        setIsHaveimage(true);
        setImageFilePreviews([{ type: fileType, file }]);
      } else {
        alert("ไม่สามารถใช้วิดีโอ เป็นภาพตัวอย่างได้")
      }
    } else {
      setIsHavefile(false);
      //setIsHaveimage((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleVideoChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video" && files.length > 0) {
      const file = files[0];
      const fileType = file.type.split("/")[0];

      if (fileType === "video") {
        // Set the selected file name in the state for preview
        //setFormData((prevData) => ({ ...prevData, bannerName: file.name }));
        setIsHavefile(true);

        setVideoFilePreviews([{ type: fileType, file }]);
      } else {
        alert("ไม่สามารถใช้รูปได้")
      }
    } else {
      setIsHavefile(false);
      //setFormData((prevData) => ({ ...prevData, [name]: value }));
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
              htmlFor="dropzone-image"
              className="flex flex-col items-center justify-center w-[547px] h-[433px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {isHaveImage ? (
                  <>
                    {imageFilePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="w-full h-full object-contain bg-black"
                      >
                        {preview.type === "image" && (
                          <img
                            src={URL.createObjectURL(preview.file)}
                            alt={`Image Preview ${index + 1}`}
                          />
                        )}
                        {preview.type === "video" && (
                          <video
                            src={URL.createObjectURL(preview.file)}
                            controls
                          />
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className=" mt-14 mb-2 text-center text-neutral-500 text-5xl font-normal">
                      <span className="font-semibold">เพิ่มรูปภาพ</span>
                    </p>
                    <p className="text-center text-neutral-500 text-xl font-normal">
                      <span className="font-semibold">หรือลากและวาง</span>
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-image"
                name="preview"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          
          <div className="items-center justify-center w-full">
            <label
              htmlFor="dropzone-video"
              className="flex flex-col items-center justify-center w-[547px] h-[433px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {isHavefile ? (
                  <>
                    {videoFilePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="w-full h-full object-contain bg-black"
                      >
                        {preview.type === "video" && (
                          <video
                            src={URL.createObjectURL(preview.file)}
                            controls
                          />
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className=" mt-14 mb-2 text-center text-neutral-500 text-5xl font-normal">
                      <span className="font-semibold">เพิ่มวิดีโอ</span>
                    </p>
                    <p className="text-center text-neutral-500 text-xl font-normal">
                      <span className="font-semibold">หรือลากและวาง</span>
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-video"
                name="video"
                type="file"
                className="hidden"
                onChange={handleVideoChange}
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
