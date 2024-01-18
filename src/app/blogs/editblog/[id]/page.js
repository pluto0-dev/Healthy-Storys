"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import Cookies from "js-cookie";

const editblog = ({ params }) => {
  const directus = new Directus("http://localhost:8055/");
  const [filePreviews, setFilePreviews] = useState([]);
  const [isHavefile, setIsHavefile] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
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
      await directus
        .items("blog")
        .updateOne(params.id, { description: formData.description });

      alert("Blog post updated successfully!");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "video" && files.length > 0) {
      // ... (unchanged logic for video)
    } else if (name === "banner" && files.length > 0) {
      const imageFile = files[0];
  
      // Set the selected file name in the state
      setFormData((prevData) => ({ ...prevData, bannerName: imageFile.name }));
      setIsHavefile(true);
      setFilePreviews([{ type: "image", file: imageFile }]);
    } else {
      setIsHavefile(false);
      setFormData((prevData) => ({ ...prevData, [name]: value }));
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
    className="relative flex flex-col items-center justify-center w-[1110px] h-[504px] rounded-[20px] border-gray-400 border-4 cursor-pointer bg-zinc-300 hover:bg-gray-400 overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-full">
      {isHavefile ? (
        <>
          {filePreviews.map((preview, index) => (
            <img
              key={index}
              src={URL.createObjectURL(preview.file)}
              alt={`Image Preview ${index + 1}`}
              className="w-full h-full object-contain bg-black"
            />
          ))}
        </>
      ) : (
        <>
          <p className=" mt-56 mb-2 text-center text-neutral-500 text-5xl font-normal">
            <span className="font-semibold">เพิ่มรูปภาพ</span>
          </p>
          <p className="text-center text-neutral-500 text-xl font-normal">
            <span className="font-semibold">หรือลากและวาง</span>
          </p>
        </>
      )}
    </div>

    <input
      id="dropzone-file"
      name="banner"
      type="file"
      className="hidden"
      onChange={handleInputChange}
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

export default editblog;
