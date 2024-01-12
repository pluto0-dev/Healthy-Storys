'use client'
import { useState } from 'react';
import { Directus } from '@directus/sdk';

// Create a Directus instance
const directus = new Directus('http://localhost:8055/'); // Update the URL to your Directus API endpoint

const CreateBlog = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    videoClipName: '',
    details: '',
  });


  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await directus.items('content').createOne({
        video: formData.dropzone,
        title: formData.videoClipName,
        description: formData.details,
      });

      console.log('Content created successfully:', response);

      // Reset the form data
      setFormData({
        videoClipName: '',
        details: '',
      });
    } catch (error) {
      console.error('Error creating content:', error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex justify-end mr-[300px]">
        <div className="w-[133px] h-[60px] px-10 py-2.5 rounded-md bg-[#587F61] text-white text-2xl font-bold shadow-sm hover:bg-[#4a6b52] mt-20 flex">
          <input type="submit" value="Post" className="" />
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
            id='dropzone-file'
              name="dropzone"
              type="file"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="input-box flex justify-center mt-5">
          <div className="text-black text-2xl font-bold my-auto mr-5">
            Video clip name
          </div>
          <input
            type="text"
            placeholder="Please enter the name of your video clip"
            className="input w-[850px] h-[50px] px-5 py-2.5 bg-white rounded-[10px] border border-zinc-300 justify-start items-center gap-2.5 inline-flex"
            required
            name="videoClipName"
            value={formData.videoClipName}
            onChange={handleInputChange}
          />
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
  );
};

export default CreateBlog;
