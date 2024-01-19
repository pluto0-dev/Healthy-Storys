"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const authToken = Cookies.get("token");
const directus = new Directus("http://localhost:8055/");
const assetsUrl = "http://localhost:8055/assets";
const EditContent = ({ params }) => {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  // });
  const router = useRouter();
  const [formData, setFormData] = useState({
    videoClipName: "",
    details: "",
  });
  const [isHavefile, setIsHavefile] = useState(false);
  const [isHaveImage, setIsHaveimage] = useState(false);
  const [imageFilePreviews, setImageFilePreviews] = useState([]);
  const [videoFilePreviews, setVideoFilePreviews] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await directus.items("content").readByQuery({
          filter: { id: params.id },
          limit: 1,
        });

        setFormData({
          title: contentResponse.data[0].title,
          preview: contentResponse.data[0].preview,
          video: contentResponse.data[0].video,
          description: contentResponse.data[0].description,
        });
        if (contentResponse.data[0].preview && contentResponse.data[0].video) {
          setImageFilePreviews([
            {
              type: "image",
              file: `${assetsUrl}/${contentResponse.data[0].preview}`,
            },
          ]);
          setVideoFilePreviews([
            {
              type: "video",
              file: `${assetsUrl}/${contentResponse.data[0].video}`,
            },
          ]);

          console.log(contentResponse);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [params.id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await directus.items("content").updateOne(params.id, {
        title: formData.title,
        description: formData.description,
        preview: imageId,
        video: videoId,
      });

      console.log("Content updated successfully:", response);
      alert("Content updated successfully");
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevUser) => ({
      ...prevUser,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleImageChange = async (e) => {
    const { name, files, type } = e.target;

    if (name === "preview" && files.length > 0) {
      const imageFile = files[0];
      setFormData((prevData) => ({ ...prevData, preview: imageFile.name }));
      setIsHaveimage(true);

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setImageFilePreviews([
          { type: "image", file: reader.result, name: imageFile.name },
        ]);
      };

      const fileUploadResponse = await uploadImage(imageFile);
      console.log("file upload", fileUploadResponse);
    } else {
      setIsHavefile(false);
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleVideoChange = async (e) => {
    const { name, value, files } = e.target;
  
    if (name === "video" && files.length > 0) {
      const file = files[0];
      const fileType = file.type.split("/")[0];
  
      if (fileType === "video") {
        setIsHavefile(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          setVideoFilePreviews([
            { type: "video", file: reader.result, name: file.name },
          ]);
  
          // Create a video element
          const videoElement = document.createElement("video");
          videoElement.controls = true;
          videoElement.src = reader.result;
          videoElement.style.width = "100%";
  
          // Get the container element (replace 'videoContainer' with your container ID or class)
          const videoContainer = document.getElementById("videoContainer");
  
          // Check if the container element exists
          if (videoContainer) {
            // Clear existing content
            videoContainer.innerHTML = "";
  
            // Append the video element to the container
            videoContainer.appendChild(videoElement);
          } else {
            console.error("Container element not found.");
          }
  
          // You can also upload the video to the server if needed
          const fileUploadResponse = await uploadVideo(file);
          console.log("file upload", fileUploadResponse);
        };
      } else {
        alert("ไม่สามารถใช้รูปได้");
      }
    } else {
      setIsHavefile(false);
    }
  };
  
  

  const [imageId, setImageId] = useState();
  const appId = authToken;

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

  const [videoId, setVideoId] = useState();

  const uploadVideo = async (file) => {
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

      setVideoId(fileUploadResponse.id);
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
          <div className="item-center justify-center w-[166px] h-[60px] rounded-md bg-[#587F61] text-white text-2xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex ">
            <input type="Submit" value="อัพเดต" className="" />
          </div>
        </div>

        <div className="mt-2">
          <div className="inline-flex items-center mx-[290px]">
            <div className="items-center justify-center mr-5">
              <label
                htmlFor="dropzone-image"
                className="flex flex-col items-center justify-center w-[547px] h-[433px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {imageFilePreviews.length > 0 ? (
                    <>
                      <div className="w-full h-full  bg-cover bg-black bg-center">
                        <img
                          src={imageFilePreviews[0].file}
                          alt={`Image Preview`}
                          className=""
                        />
                      </div>
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
                  {videoFilePreviews.length > 0 ? (
                    <>
                      <div className="w-full h-full object-contain bg-black">
                        <video src={videoFilePreviews[0].file} controls />
                      </div>
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
              name="title"
              placeholder="Please enter the name of your video clip"
              className="input w-[850px] h-[50px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box flex justify-start mt-5 ml-[319px]">
            <div className="text-black text-2xl font-bold  mr-[96px] ">
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
