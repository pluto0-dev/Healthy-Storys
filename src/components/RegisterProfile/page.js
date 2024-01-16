"use client";
import { useState } from 'react';
import { Directus } from '@directus/sdk';
import { useRouter } from 'next/navigation';

const RadioInput = ({ id, name, value, label, onChange }) => (
  <label htmlFor={id} className="flex items-center">
    <input type="radio" id={id} name={name} value={value} className="mr-2" onChange={onChange} />
    {label}
  </label>
);

const Dropdown = ({ selectedActivity, toggleDropdown, isDropdownOpen, handleActivitySelect }) => (
  <div className="dropdown mx-6 relative">
    <div
      tabIndex={0}
      role="button"
      className="btn m-1 bg-[#cbd7ce] overflow-hidden flex items-center"
      onClick={toggleDropdown}
    >
      {selectedActivity}
    </div>
    <ul
      tabIndex={0}
      className={`dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 absolute ${isDropdownOpen ? "" : "hidden"}`}
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
        <a>ออกกำลังกายเป็นประจำทุกวันหรือออกกำลังกายแบบเข้มข้น 3-4 ครั้ง/สัปดาห์</a>
      </li>
      <li onClick={() => handleActivitySelect("ออกกำลังกายแบบเข้มข้น")}>
        <a>ออกกำลังกายแบบเข้มข้น 6-7 ครั้ง/สัปดาห์</a>
      </li>
      <li onClick={() => handleActivitySelect("การออกกำลังกายที่เข้มข้นมากทุกวัน")}>
        <a>การออกกำลังกายที่เข้มข้นมากทุกวันหรือการทำงานทางกายภาพ</a>
      </li>
    </ul>
  </div>
);

const RegisterProfile = ({ isOpen, onClose, formData , username, email, password  }) => {
  const directus = new Directus('http://localhost:8055/');
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("กรุณาเลือกความถี่");
  const [formDataModal, setFormDataModal] = useState({
    age: formData.age || '',
    gender: formData.gender || '',
    height: formData.height || '',
    weight: formData.weight || '',
    frequency: '',
  });

  const handleActivitySelect = (activity) => {
    const frequencyMapping = {
      "ออกกำลังกายน้อย": 1,
      "1-3 ครั้ง/สัปดาห์": 2,
      "4-5 ครั้ง/สัปดาห์": 3,
      "ออกกำลังกายเป็นประจำทุกวัน": 4,
      "ออกกำลังกายแบบเข้มข้น": 5,
      "การออกกำลังกายที่เข้มข้นมากทุกวัน": 6,
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
    const { name, value } = e.target;
    setFormDataModal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const closeModal = () => {
    onClose(); // Use the provided onClose callback to close the modal
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
  
    // Perform actions with the collected data as needed
    console.log("Form Data:", formDataModal);
  
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
      
          alert('Registration successful!');
          router.push('/login');
        } catch (error) {
          console.error('Error registering user:', error);
        }
      onClose(); 
  };
  
  

  return (
    <>
        {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-4/12">
            <div className="flex items-center justify-between mb-6">
              <div className="text-green-700 text-lg font-semibold font-inter ml-20">
                กรอกรายละเอียดเพื่อคำนวณแคลอรี่ของคุณ
              </div>
              <div
                className="text-blue-500 text-lg font-normal font-inter cursor-pointer mr-7"
                onClick={closeModal}
              >
                ข้าม
              </div>
            </div>

            <div className="inline-flex items-start justify-center mb-4">
              <div>
                <label htmlFor="age" className="text-green-700 text-lg py-2">อายุ</label>
              </div>
              <div className="inline-flex ml-4">
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="ml-16 bg-gray-100 text-green-700 text-center rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="กรุณากรอกอายุ"
                />
                <p className="ml-7 text-green-700 text-lg py-2">อายุ 15-80</p>
              </div>
            </div>

            <div className="inline-flex items-start justify-center mb-4">
              <div>
                <label className="text-green-700 text-lg py-2">เพศ</label>
              </div>
              <div className="inline-flex flex justify-between ml-20 text-xl  text-[#587F61] text-center">
                <RadioInput id="male" name="gender" value="male" label="ชาย" onChange={handleInputChange} />
                <div className="ml-20"></div>
                <RadioInput id="female" name="gender" value="female" label="หญิง" onChange={handleInputChange} />
              </div>
            </div>

            <div className="inline-flex items-start justify-center mb-4">
              <div>
                <label htmlFor="height" className="text-green-700 text-lg py-2">ความสูง</label>
              </div>
              <div className="inline-flex ml-4">
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="ml-9 bg-gray-100 text-green-700 text-center rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="กรุณากรอกความสูง"
                />
              </div>
            </div>

            <div className="inline-flex items-start justify-center mb-4">
              <div>
                <label htmlFor="weight" className="text-green-700 text-lg py-2">น้ำหนัก</label>
              </div>
              <div className="inline-flex ml-4">
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="ml-10 bg-gray-100 text-green-700 text-center rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="กรุณากรอกน้ำหนัก"
                />
              </div>
            </div>

            <div className="inline-flex mx-auto">
              <div className="inline-flex flex justify-center">
                <div className="text-center">
                  <label className="text-green-700 text-lg">ความถี่</label>
                </div>
                <div className="ml-8 text-center">
                <Dropdown
                    selectedActivity={selectedActivity}
                    toggleDropdown={toggleDropdown}
                    isDropdownOpen={isDropdownOpen}
                    handleActivitySelect={handleActivitySelect}
                />
                </div>
              </div>
            </div>

            <div className="flex w-11/12 justify-center items-center mx-auto mt-6">
            <button
                onClick={handleProfileSubmit}
                className="bg-green-700 py-2 px-6 text-md font-semibold text-white rounded-md shadow-sm hover:bg-[#4a6b52] focus:outline-none focus:ring focus:border-blue-300"
                >
                บันทึก
                </button>
            </div>
          </div>
        </div>
        )}
    </>
  );
};

export default RegisterProfile;
