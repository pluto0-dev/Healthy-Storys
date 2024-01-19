"use client";
import { Directus } from "@directus/sdk";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const directus = new Directus("http://localhost:8055");
  const assetsUrl = "http://localhost:8055/assets";
  const [formData, setFormData] = useState("");
  const [user, setUser] = useState({
    image_profile: "",
    username: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    frequency: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === "radio") {
      setFormData(value); 
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      // Validate "age" to allow only integer values
      if (name === "age" && value !== "" && !/^\d+$/.test(value)) {
        // Display an error or handle it as needed
        console.error("Age must be a valid integer.");
        return;
      }
  
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("token");
    try {
      const updateUserData = await directus
        .items("user")
        .updateOne(userId, user);
      setUser(updateUserData);
      //console.log("User data updated successfully:", updateUserData);
      alert("User data updated successfully")
    } catch (error) {
      console.error("Error updating user:", error);
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
            {user && user.image_profile ? (
              <img
                src={`${assetsUrl}/${user.image_profile}`}
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
              name="image_profile"
              onChange={handleInputChange}
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
                <option value="3">ออกกำลังกาย 3-5 ครั้ง/สัปดาห์</option>
                <option value="4">
                อกกำลังกาย 6-7 ครั้ง/สัปดาห์
                </option>
                <option value="5">
                ออกกำลังกายเช้าเย็นทุกวัน
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
