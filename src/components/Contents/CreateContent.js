"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
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

      // Check if both preview and video are selected
      if (!imageId || !videoId) {
        alert("กรุณาเลือกรูปภาพและวิดีโอก่อนที่จะส่ง");
        return;
      }

      const contentData = {
        blog: userBlog.data[0].id,
        title: formData.videoClipName,
        description: formData.details,
        preview: imageId,
        video: videoId,
      };

      const createdContent = await directus
        .items("content")
        .createOne(contentData);

      //console.log("Content created successfully:", createdContent);

      //alert("เนื้อหาได้ถูกสร้างขึ้นเรียบร้อยแล้ว!");
      Swal.fire({
        title: 'เนื้อหาได้ถูกสร้างขึ้นเรียบร้อยแล้ว!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor:"#587F61"
      }).then(() => {
        router.push(`/myblog/${Cookies.get("token")}`);
      })
      
      setFormData({
        videoClipName: "",
        details: "",
      });
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Check if the input is the description and limit it to 255 characters
    const newValue = name === "details" ? value.slice(0, 255) : value;

    setFormData((prevUser) => ({
      ...prevUser,
      [name]: type === "file" ? files[0] : newValue,
    }));
  };

  const handleImageChange = async (e) => {
    const { name, files, type } = e.target;

    if (name === "preview" && files.length > 0) {
      const imageFile = files[0];
      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedImageTypes.includes(imageFile.type)) {
        Swal.fire({
          title: 'กรุณาใส่รูปภาพเท่านั้น',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor:"#587F61"
        })
        return; // Do not proceed with the image upload
      } else {
        setFormData((prevData) => ({ ...prevData, preview: imageFile.name }));
        setIsHaveimage(true);
        setImageFilePreviews([{ type: "image", file: imageFile }]);
        const fileUploadResponse = await uploadImage(imageFile);
        console.log("file upload", fileUploadResponse);
      }
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
        setVideoFilePreviews([{ type: fileType, file }]);
        const fileUploadResponse = await uploadVideo(file);
        console.log("file upload", fileUploadResponse);
      } else {
        Swal.fire({
          title: 'กรุณาใส่วิดีโอเท่านั้น',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor:"#587F61"
        })
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
    <form onSubmit={handleFormSubmit}>
      <div className="flex justify-end mr-[300px] mt-16">
        <div className="item-center justify-center w-[133px] h-[60px] rounded-md bg-[#587F61] text-white text-2xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex">
          <input type="submit" value="โพสต์" className="btn btn-ghost h-full w-full text-xl" />
        </div>
      </div>

      <div className="mt-2">
        <div className="inline-flex items-center mx-[260px]">
          <div className="items-center justify-center mx-5">
            <label
              htmlFor="dropzone-image"
              className="flex flex-col items-center justify-center w-[547px] h-[433px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400 rounde relative overflow-hidden"
              >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="absolute top-0 left-0 w-full h-full">
                  {isHaveImage ? (
                    <>
                      {imageFilePreviews.map((preview, index) => (
                        <div>
                          <img
                            key={index}
                            src={URL.createObjectURL(preview.file)}
                            alt={`Image Preview ${index + 1}`}
                            className="w-full h-full object-cover opacity-50"
                          />
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-10">
                            <p className=" mb-2 text-center text-neutral-500 text-5xl font-normal">
                              <span className="font-semibold">แก้ไขรูปภาพ</span>
                            </p>
                            <p className="text-center text-neutral-500 text-xl font-normal">
                              <span className="font-semibold">
                                หรือลากและวาง
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className=" mt-44 mb-2 text-center text-neutral-500 text-5xl font-normal">
                        <span className="font-semibold">เพิ่มรูปภาพ</span>
                      </p>
                      <p className="text-center text-neutral-500 text-xl font-normal">
                        <span className="font-semibold">หรือลากและวาง</span>
                      </p>
                    </>
                  )}
                </div>
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
                        className="w-full h-full object-contain bg-black opacity-50"
                      >
                        {preview.type === "video" && (
                          <video
                            src={URL.createObjectURL(preview.file)}
                            controls
                          />
                        )}
                        <div className="absolute ml-44 top-[400px]">
                          <p className=" mb-2 text-center text-neutral-800 text-5xl font-normal">
                            <span className="font-semibold">แก้ไขวิดีโอ</span>
                          </p>
                          <p className="text-center text-neutral-800 text-xl font-normal">
                            <span className="font-semibold">หรือลากและวาง</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className=" mt-12 mb-2 text-center text-neutral-500 text-5xl font-normal">
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
