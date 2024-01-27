// Register.js
"use client";
import { Directus } from "@directus/sdk";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterProfile from "../../../components/RegisterProfile/page";

// Initialize Directus client
const directus = new Directus("http://localhost:8055/");

const Register = () => {
  // State for form data and errors
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // State for controlling the profile registration modal
  const [isRegisterProfile, setIsRegisterProfileOpen] = useState(false);

  // Next.js router
  const router = useRouter();

  // Function to check for special characters
  const isSpecialCharacter = (str) => /[!#$%^&*(),?":{}|<>]/.test(str);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is the username and limit it to 50 characters
    const newValue = name === 'username' ? value.slice(0, 50) : value;

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Function to handle form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsRegisterProfileOpen(true);
    const newErrors = {};

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "โปรดป้อนที่อยู่อีเมลที่ถูกต้อง";
    }
    

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน";
    }

    // Check if password is at least 8 characters long
    if (formData.password.length < 8) {
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
    }

    // Check for password strength (uppercase, lowercase, and numbers)
    if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      newErrors.password = `ควรมีตัวอักษรพิมพ์ใหญ่-พิมพ์เล็ก และตัวเลข`;
    }

    // Check for empty fields and special characters
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `Please enter your ${
          key === "confirmPassword" ? "confirm password" : key
        }.`;
      } else if (isSpecialCharacter(value)) {
        newErrors[key] = `ไม่อนุญาตให้ใช้ตัวอักษรพิเศษใน ${key}.`;
      }
    });

    try {
      const allUsersResponse = await directus.items("user").readByQuery({ sort: ['id'] })
      console.log('alluser',allUsersResponse)
    
      const existingEmail = allUsersResponse.data.some(user => user.email === formData.email);
      const existingUsername = allUsersResponse.data.some(user => user.username === formData.username);
    
      if (existingEmail) {
        newErrors.email = "กรุณาใช้อีเมลอื่น เนื่องจากอีเมลนี้ถูกลงทะเบียนแล้ว";
      }
    
      if (existingUsername) {
        newErrors.username = "กรุณาเปลี่ยนชื่อผู้ใช้งานอื่น เนื่องจากมีในระบบแล้ว";
      }
    
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsRegisterProfileOpen(false);
        return;
      }
    } catch (error) {
      console.error("Error checking email and username:", error);
      setIsRegisterProfileOpen(false);
    }
  };

  const openRegisterProfile = () => {
    setIsRegisterProfileOpen(true);
  };

  const onClose = () => {
    setIsRegisterProfileOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-28 drop-shadow-md">
      {isRegisterProfile ? (
        <RegisterProfile
          isOpen={openRegisterProfile}
          onClose={onClose}
          formData={formData}
          username={formData.username}
          email={formData.email}
          password={formData.password}
        />
      ) : (
        <div className="card card-side bg-white rounded-[60px] w-3/4">
          <figure>
            <img src="/img.png" alt="workout" />
          </figure>
          <form
            className="flex justify-center card-body mx-24"
            onSubmit={handleProfileSubmit}
          >
            <div className="form-control">
              <h1 className="mt-1 text-black font-bold text-5xl">สวัสดี!</h1>
              <h2 className="text-black text-lg mt-10">
                ลงทะเบียนเพื่อเริ่มต้น
              </h2>

              <div className="input-box my-2">
                <input
                  type="text"
                  placeholder="อีเมล"
                  className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                  required
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>

              <div className="input-box my-2">
                <input
                  type="text"
                  placeholder="ชื่อผู้ใช้งาน"
                  className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                  required
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="text-red-500">{errors.username}</div>
                )}
              </div>

              <div className="input-box my-2">
                <input
                  type="password"
                  placeholder="รหัสผ่าน"
                  className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                  required
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>

              <div className="input-box my-2">
                <input
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500">{errors.confirmPassword}</div>
                )}
              </div>

              <div className="flex w-11/12 justify-center rounded-md bg-[#587F61] my-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]">
                <input type="submit" value="ลงทะเบียน" className="btn btn-ghost h-full w-full" />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
