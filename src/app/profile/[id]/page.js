"use client";
import { Directus } from "@directus/sdk";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const directus = new Directus("http://localhost:8055");
  const assetsUrl = "http://localhost:8055/assets";
  // const [user, setUser] = useState({
  //   username: '',
  //   age: '',
  //   gender: '',
  //   height: '',
  //   weight: '',
  //   frequency: '',
  //   profile: null, // File input state
  // });


  useEffect(() => {
    const fetchUser = async () => {
      const userId = Cookies.get("token");
      try {
        const fetchUserData = await directus.items("user").readOne(userId);
        setUser(fetchUserData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: files[0],
  //   }));
  // };

  // const handleInputChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: type === 'file' ? files[0] : value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Upload the profile image first
  //     // const fileUuid = await uploadImage();
  
  //     // Update user profile with the new file UUID and modified fields
  //     const updatedUserData = {};
  
  //     if (user.age) {
  //       updatedUserData.age = user.age;
  //     }
  
  //     if (user.gender) {
  //       updatedUserData.gender = user.gender;
  //     }
  
  //     if (user.height) {
  //       updatedUserData.height = user.height;
  //     }
  
  //     if (user.weight) {
  //       updatedUserData.weight = user.weight;
  //     }
  
  //     if (user.frequency) {
  //       updatedUserData.frequency = user.frequency;
  //     }
  //     updatedUserData.profile = 'c92bb995-d6ee-4e4e-af02-0c3068d95510';
  //     if (updatedUserData) {
  //       const userId = Cookies.get("token");
  //       const updatedUser = await directus.items('user').updateOne({
  //       userId
  //       }, updatedUserData);
  
  //       console.log('User profile updated successfully:', updatedUser);
  //     } else {
  //       console.log('No changes to update.');
  //     }
  //   } catch (error) {
  //     console.error('Error updating user profile:', error.message);
  //   }
  // };

  const [user, setUser] = useState({
    profile: "",
    username: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    frequency: "",
  });


  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "radio") {
      setUser((prevUser) => ({ ...prevUser, [name]: formData }));
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("token");
    try {
      console.log('file upload on submit', fileId);
  
      const updatedUserData = {
        ...user,
        profile: fileId,
      };
  
      const updatedUser = await directus.items('user').updateOne(userId, updatedUserData);
      setUser(updatedUser);
  
      console.log('User profile updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };
  

  // const handleFileChange = async (e) => {
  //   const { name, files } = e.target;
  //   try {

  
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       profile: fileUploadResponse,
  //     }));
  //   } catch (error) {
  //     console.error('Error handling file change:', error.message);
  //   }
  // }
  const [filePreviews, setFilePreviews] = useState([]);
  const [isHavefile, setIsHavefile] = useState(false);

  const handlefileChange = async (e) => {
    const { name, files, type } = e.target;
  
    if (name === "profile" && files.length > 0) {
      // const imageFile = files[0];
      // setUser((prevData) => ({ ...prevData, profileName: imageFile.name }));
      setIsHavefile(true);
      setFilePreviews([{ type: "image", file: imageFile }]);
      const fileUploadResponse = await uploadImage(imageFile);
      console.log('file upload', fileUploadResponse);
    } else {
      setIsHavefile(false);
      setUser((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  
  const appId = Cookies.get("token");

  // const uploadFile = async ({ file, fileName, appId, documentType, type }) => {
  //   try {
  //     const formData = new FormData();

  //     formData.append('file', file);
  //     formData.append('fileName', fileName);
  //     formData.append('appId', appId);
  //     formData.append('documentType', documentType);
  //     formData.append('type', type);

  //     const response = await fetch("http://localhost:8055/", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //       },
  //     });
  //     const data = await response.json();
  
  //     return data;
  //   } catch (error) {
  //     throw new Error(`Error uploading file: ${error.message}`);
  //   }
  // };
  
  // const uploadImage = async (filename) => {
  //   try {
  //     const fileBlob = await fetch(user.profile).then((response) => response.blob());
  
  //     const formData = new FormData();
  //     formData.append('file', fileBlob, filename || user.profile.name);
  //     formData.append('appId', appId);
  //     formData.append('type', ["image/gif", "image/jpeg", "image/jpg", "image/png"]);
  //     formData.append('storage', 'local');
  //     formData.append('filename_download', filename || user.profile.name);
  
  //     // Make the API request to upload the file
  //     const fileUploadResponse = await directus.files.createOne(formData, {
  //       headers: {
  //         'Accept': 'application/json',
  //         // No need to set Content-Type, it will be set automatically by FormData
  //       },
  //     });
  
  //     // Log the response for debugging
  //     console.log('File upload response:', fileUploadResponse);
  
  //     // Assuming the ID is accessible in the response data, return it
  //     return fileUploadResponse.id;
  //   } catch (error) {
  //     // Log and rethrow the error for handling in the calling code
  //     console.error('Error uploading image:', error.message);
  //     throw error;
  //   }
  // };

  // const allowedImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];

  // if (!allowedImageTypes.includes(fileBlob.type)) {
  //   throw new Error('Invalid image type. Please upload a valid image.');
  // }  

  const [fileId, setFileId] = useState();
  
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      const blob = new Blob([file], { type: file.type });
      formData.append('file', blob, file.name);
      formData.append('appId', appId);
      formData.append('storage', 'local');
  
      const fileUploadResponse = await directus.files.createOne(formData, {
        headers: {
          'Accept': 'application/json',
        },
      });
  
      console.log('File upload response:', fileUploadResponse);

      setFileId(fileUploadResponse.id);
      return fileUploadResponse.id;
    } catch (error) {
      console.error('Error uploading image:', error.message);
      throw error;
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-[url('/bg3.png')] bg-center bg-cover">
      <div className="text-center text-white text-5xl font-normal font-['Lalezar'] mb-8 mt-28">
      โปรไฟล์
      </div>
      <div className="flex items-center justify-center ml-6 mb-6">
        <div className="avatar mr-4">
          <div className="w-[136px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {user && user.profile ? (
              <img
                src={`${assetsUrl}/${user.profile}`}
                alt="User Avatar"
              />
            ) : (
              <img src="/profile.png" alt="Default Avatar" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="w-40 h-[50px] bg-[#587F61] rounded-[10px] justify-center items-center hover:bg-[#48684f]"
          >
            <div className="flex items-center justify-center">
              <p className="text-white text-xl font-normal items-center mt-3">
                <span className="font-semibold">แก้ไข</span>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="profile"
              onChange={(e) => handlefileChange(e)}
            />
          </label>
        </div>
      </div>

      <div className="card w-2/4 h-3/6 bg-[#eef2ef] shadow-xl">
        <form className="card-body text-[#587F61]" onSubmit={handleSubmit}>
          <div className="form-control justify-center">
            <div className="input-box mb-2 ml-36 mr-0 mx-2 ">
ชื่อผู้ใช้
              <input
              type="text"
                name="username"
                placeholder="Enter your username"
                value={user.username}
                onChange={handleInputChange}
                className="input input-bordered w-2/4 max-w-ws bg-[#cbd7ce] placeholder-[#587F61] ml-4 "
                required
              />
            </div>
            <div className="input-box my-2 ml-36 mr-0">
            อายุ
              <input
                type="text"
                name="age"
                placeholder="Enter your age"
                value={user.age}
                onChange={handleInputChange}
                className="input input-bordered w-2/4 bg-[#cbd7ce] placeholder-[#587F61] mx-9"
                required
              />
              อายุ 15-80
            </div>
            <div className="inline-flex items-center ml-36 mr-0 mx-2">
            เพศ
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={handleInputChange}
                className="radio checked:bg-[#587F61] ml-10"
              />
              <label htmlFor="male">ชาย</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={handleInputChange}
                className="radio checked:bg-[#587F61] ml-10"
              />
              <label htmlFor="female">หญิง</label>
            </div>

            <div className="input-box my-2 ml-36 mr-0 ">
            ความสูง
              <input
                type="text"
                name="height"
                placeholder="Enter your height"
                className="input input-bordered w-2/4 bg-[#cbd7ce] placeholder-[#587F61] ml-3"
                value={user.height}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box my-2 ml-36 mr-0">
            น้ำหนัก
              <input
                type="text"
                name="weight"
                placeholder="Enter your weight"
                className="input input-bordered w-2/4 bg-[#cbd7ce] placeholder-[#587F61] ml-[18px]"
                value={user.weight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="dropdown ml-36 mr-0">
            ความถี่
              <select
                value={user.frequency}
                onChange={handleInputChange}
                className="btn m-1 bg-[#cbd7ce] w-2/4 ml-[20px] border-none text-[#587F61]  hover:bg-[#bcc7bf]"
                name="frequency"
              >
                <option value="">Select Activity</option>
                <option value="1">ออกกำลังกายน้อยหรือไม่มีเลย</option>
                <option value="2">ออกกำลังกาย 1-3 ครั้ง/สัปดาห์</option>
                <option value="3">ออกกำลังกาย 4-5 ครั้ง/สัปดาห์</option>
                <option value="4">
                ออกกำลังกายเป็นประจำทุกวันหรือออกกำลังกายแบบเข้มข้น 3-4 ครั้ง/สัปดาห์
                </option>
                <option value="5">
                ออกกำลังกายแบบเข้มข้น 6-7 ครั้ง/สัปดาห์
                </option>
                <option value="6">
                การออกกำลังกายที่เข้มข้นมากทุกวันหรือการทำงานทางกายภาพ
                </option>
              </select>
            </div>

            <div className="flex items-center justify-center mt-2 w-3/4 max-w-ws">
              <div className="flex w-2/4 justify-center rounded-md bg-[#587F61] ml-[130px] py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52] ">
                <input type="submit" value="บันทึก" className="max-w-ws" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

