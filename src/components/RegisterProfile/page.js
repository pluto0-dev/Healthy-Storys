// "use client";
// import { useState } from "react";
// import { Directus } from "@directus/sdk";
// import { useRouter } from "next/navigation";

// const RadioInput = ({ id, name, value, label, onChange }) => (
//   <label htmlFor={id} className="flex items-center">
//     <input
//       type="radio"
//       id={id}
//       name={name}
//       value={value}
//       className="mr-2"
//       onChange={onChange}
//     />
//     {label}
//   </label>
// );

// const Dropdown = ({
//   selectedActivity,
//   toggleDropdown,
//   isDropdownOpen,
//   handleActivitySelect,
// }) => (
//   <div className="dropdown mx-6 relative">
//     <div
//       tabIndex={0}
//       role="button"
//       className="btn w-[485px] bg-gray-100 text-green-700 border-none text-center rounded-md py-2 px-4   hover:bg-gray-200"
//       onClick={toggleDropdown}
//     >
//       {selectedActivity}
//     </div>
//     <ul
//       tabIndex={0}
//       className={`dropdown-content z-[1] menu p-2 w-[485px] shadow bg-white rounded-box mt-2 absolute ${
//         isDropdownOpen ? "" : "hidden"
//       }`}
//     >
//       <li onClick={() => handleActivitySelect("ออกกำลังกายน้อย")}>
//         <a>ออกกำลังกายน้อยหรือไม่มีเลย</a>
//       </li>
//       <li onClick={() => handleActivitySelect("1-3 ครั้ง/สัปดาห์")}>
//         <a>ออกกำลังกาย 1-3 ครั้ง/สัปดาห์</a>
//       </li>
//       <li onClick={() => handleActivitySelect("4-5 ครั้ง/สัปดาห์")}>
//         <a>ออกกำลังกาย 4-5 ครั้ง/สัปดาห์</a>
//       </li>
//       <li onClick={() => handleActivitySelect("ออกกำลังกายเป็นประจำทุกวัน")}>
//         <a>
//           ออกกำลังกายเป็นประจำทุกวันหรือออกกำลังกายแบบเข้มข้น 3-4 ครั้ง/สัปดาห์
//         </a>
//       </li>
//       <li onClick={() => handleActivitySelect("ออกกำลังกายแบบเข้มข้น")}>
//         <a>ออกกำลังกายแบบเข้มข้น 6-7 ครั้ง/สัปดาห์</a>
//       </li>
//       <li
//         onClick={() =>
//           handleActivitySelect("การออกกำลังกายที่เข้มข้นมากทุกวัน")
//         }
//       >
//         <a>การออกกำลังกายที่เข้มข้นมากทุกวันหรือการทำงานทางกายภาพ</a>
//       </li>
//     </ul>
//   </div>
// );

// const RegisterProfile = ({
//   isOpen,
//   onClose,
//   formData,
//   username,
//   email,
//   password,
// }) => {
//   const directus = new Directus("http://localhost:8055/");
//   const router = useRouter();
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState("กรุณาเลือกความถี่");
//   const [formDataModal, setFormDataModal] = useState({
//     age: formData.age || "",
//     gender: formData.gender || "",
//     height: formData.height || "",
//     weight: formData.weight || "",
//     frequency: "",
//   });

//   const handleActivitySelect = (activity) => {
//     const frequencyMapping = {
//       ออกกำลังกายน้อย: 1,
//       "1-3 ครั้ง/สัปดาห์": 2,
//       "4-5 ครั้ง/สัปดาห์": 3,
//       ออกกำลังกายเป็นประจำทุกวัน: 4,
//       ออกกำลังกายแบบเข้มข้น: 5,
//       การออกกำลังกายที่เข้มข้นมากทุกวัน: 6,
//     };

//     const frequencyValue = frequencyMapping[activity];

//     setSelectedActivity(activity);
//     setFormDataModal((prevData) => ({
//       ...prevData,
//       frequency: frequencyValue.toString(), // Convert to string if necessary
//     }));
//     setDropdownOpen(false);
//   };

// const handleInputChange = (e) => {
//   const { name, value } = e.target;

//   if (name === "age") {
//     const currentValue = parseFloat(value);
//     const keyCode = e.keyCode || e.which;

//     // Allow arrow keys, backspace, and delete
//     if (
//       (keyCode >= 37 && keyCode <= 40 && currentValue >= 0) ||
//       keyCode === 8 ||
//       keyCode === 46
//     ) {
//       // Allow arrow keys, backspace, and delete
//     } else if (String.fromCharCode(keyCode) === "." || String.fromCharCode(keyCode) === "-" || currentValue < 0 || String.fromCharCode(keyCode) === "e") {
//       // Prevent other unwanted key presses
//       e.preventDefault();
//     } else {
//       const intValue = parseInt(value, 10);

//       if (!Number.isNaN(intValue) && intValue >= 15 && intValue <= 80) {
//         setFormDataModal((prevData) => ({
//           ...prevData,
//           [name]: intValue,
//         }));
//       }
//     }
//   } else if (name === "weight" || name === "height") {
//       const currentValue = parseFloat(value);
//       if (e.key === '-' || currentValue < 0 || e.key === 'e') {
//         e.preventDefault();
//       } else {
//         const newValue = value.replace(/[^0-9]/g, '');
//         setFormDataModal((prevUser) => ({ ...prevUser, [name]: value}));
//       }
//     } else {
//       // For other inputs, update the state as usual
//       setFormDataModal((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

  

//   const closeModal = () => {
//     onClose(); // Use the provided onClose callback to close the modal
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
  
//     // Validate the age before submitting the form
//     if (
//       formDataModal.age < 15 ||
//       formDataModal.age > 50 ||
//       !Number.isInteger(formDataModal.age)
//     ) {
//       // Display an alert for invalid age
//       alert('ค่าอายุต้องอยู่อยู่ระหว่าง 15 ถึง 80 ');
//       return;
//     }
  
//     // Perform actions with the collected data as needed
//     console.log('Form Data:', formDataModal);
  
//     try {
//       const response = await directus.items('user').createOne({
//         email: email,
//         username: username,
//         password: password,
//         age: formDataModal.age,
//         gender: formDataModal.gender,
//         height: formDataModal.height,
//         weight: formDataModal.weight,
//         frequency: formDataModal.frequency,
//       });
  
//       console.log('User registered successfully:', response);
  
//       alert('Registration successful!');
//       router.push('/login');
//     } catch (error) {
//       console.error('Error registering user:', error);
//     }
  
//     onClose();
//   };

//   const handleProfileSubmitWithSkip = async (e) => {
//     e.preventDefault();

//     // Perform actions with the collected data as needed
//     console.log("Form Data:", formDataModal);

//     try {
//       const response = await directus.items("user").createOne({
//         email: email,
//         username: username,
//         password: password,
//         age: "",
//         gender: "",
//         height: "",
//         weight: "",
//         frequency: "",
//       });

//       console.log("User registered successfully:", response);

//       alert("Registration successful!");
//       router.push("/login");
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//     onClose();
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center mt-10">
//           <div className="card bg-white rounded-[80px] shadow-md">
//             <div className=" card-body mb-6 w-[1000px] h-auto inline-flex  ">
//               <div className="card-title text-green-700 text-2xl font-semibold font-inter justify-center mt-6">
//                 กรอกรายละเอียดเพื่อคำนวณแคลอรี่ของคุณ
//               </div>
//               <div className=" absolute  end-20 text-xl" onClick={handleProfileSubmitWithSkip}>
//                 ข้าม
//               </div>

//               <div className="inline-flex item-center justify-between  mx-24 mt-5">
//                 <div>
//                   <label htmlFor="age" className="text-xl font-semibold  text-[#587F61]">
//                     อายุ
//                   </label>
//                 </div>
//                 <div className="">
//                   <input
//                     type="number"
//                     id="age"
//                     name="age"
//                     value={formData.age}
//                     onChange={handleInputChange}
//                     onKeyDown={handleInputChange}
//                     className="mr-16 w-[485px]  px-5 py-2.5 bg-zinc-100 rounded-[10px] focus:outline-none focus:ring focus:border-green-600"
//                     placeholder="กรุณากรอกอายุ"
//                   />
//                   <div className="inline-flex text-[#587F61]">อายุ 15-80</div>
//                 </div>
//               </div>

//               <div className="flex justify-start mx-24 mt-5">
//                 <div>
//                   <label className="text-xl font-semibold text-[#587F61]">เพศ</label>
//                 </div>
//                 <div className="flex mx-24 text-xl  text-[#587F61] text-center">
//                   <RadioInput
//                     id="male"
//                     name="gender"
//                     value="male"
//                     label="ชาย"
//                     onChange={handleInputChange}
//                   />
//                   <div className="flex mx-24">
//                   <RadioInput
//                     id="female"
//                     name="gender"
//                     value="female"
//                     label="หญิง"
//                     className="ml-5"
//                     onChange={handleInputChange}
//                   />
//                   </div>
//                 </div>
//               </div>

//               <div className="inline-flex mx-24 justify-between mr-[173px] mt-5">
//                 <div>
//                   <label
//                     htmlFor="height"
//                     className="text-xl font-semibold text-[#587F61]"
//                   >
//                     ความสูง
//                   </label>
//                 </div>
//                 <div className="">
//                   <input
//                     type="number"
//                     id="height"
//                     name="height"
//                     value={formData.height}
//                     onChange={handleInputChange}
//                     onKeyDown={handleInputChange}
//                     className="mr-16 w-[485px]  px-5 py-2.5 bg-zinc-100 rounded-[10px] focus:outline-none focus:ring focus:border-green-600"
//                     placeholder="กรุณากรอกความสูง"
//                   />
//                 </div>
//               </div>

//               <div className="inline-flex mx-24 mt-5">
//                 <div>
//                   <label htmlFor="weight" className="text-xl font-semibold text-[#587F61]">
//                     น้ำหนัก
//                   </label>
//                 </div>
//                 <div className=" ml-[58px] ">
//                   <input
//                     type="number"
//                     id="weight"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleInputChange}
//                     onKeyDown={handleInputChange}
//                     className="mr-16 w-[485px]  px-5 py-2.5 bg-zinc-100 rounded-[10px] focus:outline-none focus:ring focus:border-green-600"
//                     placeholder="กรุณากรอกน้ำหนัก"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <div className="inline-flex mx-24 justify-center">
//                   <div className="text-center">
//                     <label className="text-xl font-semibold text-[#587F61]">ความถี่</label>
//                   </div>
//                   <div className="w-[485px] ml-9 text-center">
//                     <Dropdown
//                       selectedActivity={selectedActivity}
//                       toggleDropdown={toggleDropdown}
//                       isDropdownOpen={isDropdownOpen}
//                       handleActivitySelect={handleActivitySelect}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="card-action flex justify-center items-center mt-6">
//                 <button onClick={handleProfileSubmit} className=" bg-green-700 py-2 px-6 text-md font-semibold text-white rounded-md shadow-sm hover:bg-[#4a6b52] focus:outline-none focus:ring focus:border-blue-300">
//                   บันทึก
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default RegisterProfile;
"use client";
import { useState } from "react";
import { Directus } from "@directus/sdk";
import { useRouter } from "next/navigation";

const RadioInput = ({ id, name, value, label, onChange }) => (
  <label htmlFor={id} className="flex items-center">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      className="mr-2"
      onChange={onChange}
    />
    {label}
  </label>
);

const Dropdown = ({
  selectedActivity,
  toggleDropdown,
  isDropdownOpen,
  handleActivitySelect,
}) => (
  <div className="dropdown mx-6 relative">
    <div
      tabIndex={0}
      role="button"
      className="btn w-[485px] bg-gray-100 text-green-700 border-none text-center rounded-md py-2 px-4   hover:bg-gray-200"
      onClick={toggleDropdown}
    >
      {selectedActivity}
    </div>
    <ul
      tabIndex={0}
      className={`dropdown-content z-[1] menu p-2 w-[485px] shadow bg-white rounded-box mt-2 absolute ${
        isDropdownOpen ? "" : "hidden"
      }`}
    >
      <li onClick={() => handleActivitySelect("ออกกำลังกายน้อย")}>
        <a>ออกกำลังกายน้อยหรือไม่มีเลย</a>
      </li>
      <li onClick={() => handleActivitySelect("1-3 ครั้ง/สัปดาห์")}>
        <a>ออกกำลังกาย 1-3 ครั้ง/สัปดาห์</a>
      </li>
      <li onClick={() => handleActivitySelect("4-5 ครั้ง/สัปดาห์")}>
        <a>ออกกำลังกาย 4-5 ครั้ง/สัปดาห์</a>
      </li>
      <li onClick={() => handleActivitySelect("ออกกำลังกายเป็นประจำทุกวัน")}>
        <a>
          ออกกำลังกายเป็นประจำทุกวันหรือออกกำลังกายแบบเข้มข้น 3-4 ครั้ง/สัปดาห์
        </a>
      </li>
      <li onClick={() => handleActivitySelect("ออกกำลังกายแบบเข้มข้น")}>
        <a>ออกกำลังกายแบบเข้มข้น 6-7 ครั้ง/สัปดาห์</a>
      </li>
      <li
        onClick={() =>
          handleActivitySelect("การออกกำลังกายที่เข้มข้นมากทุกวัน")
        }
      >
        <a>การออกกำลังกายที่เข้มข้นมากทุกวันหรือการทำงานทางกายภาพ</a>
      </li>
    </ul>
  </div>
);

const RegisterProfile = ({
  isOpen,
  onClose,
  formData,
  username,
  email,
  password,
}) => {
  const directus = new Directus("http://localhost:8055/");
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("กรุณาเลือกความถี่");
  const [formDataModal, setFormDataModal] = useState({
    age: formData.age || "",
    gender: formData.gender || "",
    height: formData.height || "",
    weight: formData.weight || "",
    frequency: "",
  });

  const handleActivitySelect = (activity) => {
    const frequencyMapping = {
      ออกกำลังกายน้อย: 1,
      "1-3 ครั้ง/สัปดาห์": 2,
      "4-5 ครั้ง/สัปดาห์": 3,
      ออกกำลังกายเป็นประจำทุกวัน: 4,
      ออกกำลังกายแบบเข้มข้น: 5,
      การออกกำลังกายที่เข้มข้นมากทุกวัน: 6,
    };

    const frequencyValue = frequencyMapping[activity];

    setSelectedActivity(activity);
    setFormDataModal((prevData) => ({
      ...prevData,
      frequency: frequencyValue.toString(), // Convert to string if necessary
    }));
    setDropdownOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value,} = e.target;
  
    if (name === "age") {
      const currentValue = parseFloat(value);
      if (e.key === '.' || e.key === '-' || currentValue < 0 || e.key === 'e') {
        e.preventDefault();
      } else {
        setFormDataModal((prevUser) => ({ ...prevUser, [name]: value }));
      }
    } else if (name === "weight" || name === "height") {
      const currentValue = parseFloat(value);
      if (e.key === '-' || currentValue < 0 || e.key === 'e') {
        e.preventDefault();
      } else {
        const newValue = value.replace(/[^0-9]/g, '');
        setFormDataModal((prevUser) => ({ ...prevUser, [name]: value}));
      }
  
    } else {
      setFormDataModal((prevData) => ({
                ...prevData,
                [name]: value,
              }));
    }
  };
  
      
  const closeModal = () => {
    onClose(); // Use the provided onClose callback to close the modal
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the age before submitting the form
    if (
      formDataModal.age < 15 ||
      formDataModal.age > 80 || // Corrected to check against 80
      !Number.isInteger(parseFloat(formDataModal.age)) // Check if it's a valid integer or can be converted to one
    ) {
      // Display an alert for invalid age
      alert('ค่าอายุต้องอยู่อยู่ระหว่าง 15 ถึง 80 ');
      return;
    }
  
    // Perform actions with the collected data as needed
    console.log('Form Data:', formDataModal);
  
    try {
      const response = await directus.items('user').createOne({
        email: email,
        username: username,
        password: password,
        age: formDataModal.age,
        gender: formDataModal.gender,
        height: formDataModal.height,
        weight: formDataModal.weight,
        frequency: formDataModal.frequency,
      });
  
      console.log('User registered successfully:', response);
  
      alert('ทำการลงทะเบียนสำเร็จ');
      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  
    onClose();
  };

  const handleProfileSubmitWithSkip = async (e) => {
    e.preventDefault();

    // Perform actions with the collected data as needed
    console.log("Form Data:", formDataModal);

    try {
      const response = await directus.items("user").createOne({
        email: email,
        username: username,
        password: password,
        age: "",
        gender: "",
        height: "",
        weight: "",
        frequency: "",
      });

     // console.log("ทำการลงทะเบียนสำเร็จ", response);

      alert("ทำการลงทะเบียนสำเร็จ");
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center mt-10">
          <div className="card bg-white rounded-[80px] shadow-md">
            <div className=" card-body mb-6 w-[1000px] h-auto inline-flex  ">
              <div className="card-title text-green-700 text-2xl font-semibold font-inter justify-center mt-6">
                กรอกรายละเอียดเพื่อคำนวณแคลอรี่ของคุณ
              </div>
              <div className=" absolute  end-20 text-xl" onClick={handleProfileSubmitWithSkip}>
                ข้าม
              </div>

              <div className="inline-flex item-center justify-between  mx-24 mt-5">
                <div>
                  <label htmlFor="age" className="text-xl font-semibold  text-[#587F61]">
                    อายุ
                  </label>
                </div>
                <div className="">
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                onKeyDown={handleInputChange}
                min="0"
                    className="mr-16 w-[485px]  px-5 py-2.5 bg-zinc-100 rounded-[10px] focus:outline-none focus:ring focus:border-green-600"
                    placeholder="กรุณากรอกอายุ"
                  />
                  <div className="inline-flex text-[#587F61]">อายุ 15-80</div>
                </div>
              </div>

              <div className="flex justify-start mx-24 mt-5">
                <div>
                  <label className="text-xl font-semibold text-[#587F61]">เพศ</label>
                </div>
                <div className="flex mx-24 text-xl  text-[#587F61] text-center">
                  <RadioInput
                    id="male"
                    name="gender"
                    value="male"
                    label="ชาย"
                    onChange={handleInputChange}
                  />
                  <div className="flex mx-24">
                  <RadioInput
                    id="female"
                    name="gender"
                    value="female"
                    label="หญิง"
                    className="ml-5"
                    onChange={handleInputChange}
                  />
                  </div>
                </div>
              </div>

              <div className="inline-flex mx-24 justify-between mr-[173px] mt-5">
                <div>
                  <label
                    htmlFor="height"
                    className="text-xl font-semibold text-[#587F61]"
                  >
                    ความสูง
                  </label>
                </div>
                <div className="">
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
               onKeyDown={handleInputChange}
               min="0"
                    className="mr-16 w-[485px]  px-5 py-2.5 bg-zinc-100 rounded-[10px] focus:outline-none focus:ring focus:border-green-600"
                    placeholder="กรุณากรอกความสูง"
                  />
                </div>
              </div>

              <div className="inline-flex mx-24 mt-5">
                <div>
                  <label htmlFor="weight" className="text-xl font-semibold text-[#587F61]">
                    น้ำหนัก
                  </label>
                </div>
                <div className=" ml-[58px] ">
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
               onKeyDown={handleInputChange}
               min="0"
                    className="mr-16 w-[485px]  px-5 py-2.5 bg-zinc-100 rounded-[10px] focus:outline-none focus:ring focus:border-green-600"
                    placeholder="กรุณากรอกน้ำหนัก"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="inline-flex mx-24 justify-center">
                  <div className="text-center">
                    <label className="text-xl font-semibold text-[#587F61]">ความถี่</label>
                  </div>
                  <div className="w-[485px] ml-9 text-center">
                    <Dropdown
                      selectedActivity={selectedActivity}
                      toggleDropdown={toggleDropdown}
                      isDropdownOpen={isDropdownOpen}
                      handleActivitySelect={handleActivitySelect}
                    />
                  </div>
                </div>
              </div>

              <div className="card-action flex justify-center items-center mt-6">
                <button onClick={handleProfileSubmit} className=" bg-green-700 py-2 px-6 text-md font-semibold text-white rounded-md shadow-sm hover:bg-[#4a6b52] focus:outline-none focus:ring focus:border-blue-300">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterProfile;
