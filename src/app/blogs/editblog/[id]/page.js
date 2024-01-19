"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";

const editblog = ({ params }) => {
  const directus = new Directus("http://localhost:8055/");
  const assetsUrl = "http://localhost:8055/assets";

  const [filePreviews, setFilePreviews] = useState([]);
  const [isHavefile, setIsHavefile] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentResponse = await directus.items("blog").readByQuery({
          filter: { id: params.id },
          limit: 1,
        });

        setFormData({
          description: contentResponse.data[0].description,
        });

        // Fetch and set the banner image previews
        if (contentResponse.data[0].banner) {
          setFilePreviews([
            {
              type: "image",
              file: `${assetsUrl}/${contentResponse.data[0].banner}`,
            },
          ]);
          setIsHavefile(true);
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
      const updatedData = {
        ...formData,
        banner: fileId,
      };
      await directus.items("blog").updateOne(params.id, updatedData);

      alert("Blog post updated successfully!");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));

    // Update preview when changing input
    if (type === "file" && name === "banner") {
      handlefileChange(e);
    }
  };

  const handlefileChange = async (e) => {
    const { name, files } = e.target;

    if (name === "banner" && files.length > 0) {
      const imageFile = files[0];
      setFormData((prevData) => ({ ...prevData, bannerName: imageFile.name }));
      setIsHavefile(true);

      // Read the image file and create a base64 data URL
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setFilePreviews([
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

  const [fileId, setFileId] = useState();
  const appId = params.id;

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

      setFileId(fileUploadResponse.id);
      return fileUploadResponse.id;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center w-[1110px] h-[504px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full">
            {filePreviews.length > 0 && (
              <img
                src={filePreviews[0].file}
                alt={`Image Preview`}
                className="w-full h-full object-contain bg-black opacity-50"
              />
            )}

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-normal text-center z-10">
              <p className="font-semibold mb-2">คลิกเพื่อเพิ่มรูป</p>
              <p>หรือลากและวาง</p>
            </div>
          </div>

          <input
            id="dropzone-file"
            name="banner"
            type="file"
            className="hidden"
            onChange={handlefileChange}
          />
        </label>

        </div>

        <div className="input-box flex justify-start mt-5 ml-[312px]">
          <div className="text-black text-2xl font-bold mr-[125px] ">
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

        <div className="flex justify-end mt-6">
          <div className="w-[133px] h-[60px] item-center justify-center rounded-md bg-[#587F61] text-white text-xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex">
            <input type="submit" value="อัพเดตบล็อก" />
          </div>
        </div>
      </form>
    </>
  );
};

export default editblog;
