"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Directus } from "@directus/sdk";
import ResultModal from "../Calculate/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
const Calorie = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  // useEffect(() => {
  //   if (!token) {
  //     alert("Please login first");
  //     router.push("/login");
  //   }
  // }, [token, router]);

  const directus = new Directus("http://localhost:8055");
  const userID = Cookies.get("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDataNull, setIsDataNull] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [bmr, setBMR] = useState(null);
  const [tdee, setTDEE] = useState(null);
  const [result, setResult] = useState(null);
  const [breakfastInput, setBreakfastInput] = useState("");
  const [lunchInput, setLunchInput] = useState("");
  const [dinnerInput, setDinnerInput] = useState("");
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState({
    calculatedBMR: null,
    calculatedTDEE: null,
    calculatedResult: null,
  });
  const [userInfo, setUserInfo] = useState({
    age: null,
    gender: null,
    weight: null,
    height: null,
    frequency: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const fetchUserData = async () => {
    try {
      const response = await directus.items("user").readOne(userID);
      const userData = response;
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      router.push("/login");
      setIsModalOpen(false);
    }else{
      setIsModalOpen(true);
    }
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearFunction = () => {
    setBreakfastInput("");
    setLunchInput("");
    setDinnerInput("");
  };

  const calculateBMR = (gender, weight, height, age) => {
    let bmr;
    if (gender.toLowerCase() === "female") {
      bmr = 665 + 9.6 * weight + 1.8 * height - 4.7 * age;
    } else {
      bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    }
    return bmr;
  };

  const calculateTDEE = (bmr, frequency) => {
    const FREQUENCY_MULTIPLIERS = {
      1: 1.2,
      2: 1.375,
      3: 1.55,
      4: 1.725,
      5: 1.9,
    };
    let tdee;
    const roundedBMR = Math.round(bmr);
    const multiplier = FREQUENCY_MULTIPLIERS[frequency];
    // console.log(roundedBMR)
    // console.log(multiplier)
    // console.log(Math.round(roundedBMR * multiplier))
    tdee = roundedBMR * multiplier;
    return tdee;
  };

  const calculateResult = (tdee, breakfast, lunch, dinner) => {
    let result;
    const roundedTDEE = Math.round(tdee);
    const totalCaloriesConsumed = breakfast + lunch + dinner;
    const caloriesRemaining = roundedTDEE - totalCaloriesConsumed;
    result = Math.round(caloriesRemaining);
    return result;
  };

  const calculateValues = () => {
    if (userData && userData.frequency) {
      const { gender, weight, height, age, frequency } = userData;

      const calculatedBMR = calculateBMR(gender, weight, height, age);
      const calculatedTDEE = calculateTDEE(calculatedBMR, frequency);

      let breakfast = parseFloat(breakfastInput);
      let lunch = parseFloat(lunchInput);
      let dinner = parseFloat(dinnerInput);

      if (isNaN(breakfast) && isNaN(lunch) && isNaN(dinner)) {
        breakfast = 400;
        lunch = 400;
        dinner = 400;
      }

      const calculatedResult = calculateResult(
        calculatedTDEE,
        breakfast || 0,
        lunch || 0,
        dinner || 0
      );

      setCalculatedValues({
        calculatedBMR,
        calculatedTDEE,
        calculatedResult,
      });

      setBMR(calculatedBMR);
      setTDEE(calculatedTDEE);
      setResult(calculatedResult);

      // console.log('Calculated BMR:', calculatedBMR);
      // console.log('Calculated TDEE:', calculatedTDEE);
      // console.log('Calculated Result:', calculatedResult);
      // console.log('frequency', FREQUENCY_MAP[userInfo.frequency])
    }
  };

  const openResultModal = () => {
    setIsResultModalOpen(true);
  };

  const validateUserData = () => {
    const requiredFields = ["age", "gender", "weight", "height", "frequency"];
    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
       
      return false;
    }

    return true;
  };
  const closeConfirmation = () => {
    setIsDataNull(false);
  };
const gotoEditData = () => {
  setIsDataNull(false);
  closeModal();
  router.push(`/profile/${Cookies.get("token")}}`)
}


  const handleCalculate = () => {
    if (validateUserData()) {
      calculateValues();
      closeModal();
      openResultModal();
    } else {
      setIsDataNull(true);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setUserInfo({
        age: userData.age,
        gender: userData.gender,
        weight: userData.weight,
        height: userData.height,
        frequency: userData.frequency,
      });
      calculateValues();
    }
  }, [userData, breakfastInput, lunchInput, dinnerInput]);
  // const handleInputChange = (e, setInputFunction) => {
  //   const inputValue = e.target.value;
  
  //   // Check if the input value contains 'e'
  //   if (!inputValue.includes('e')) {
  //     // Remove any occurrences of '-' in the input value
  //     const sanitizedInput = inputValue.replace(/-/g, '');
  
  //     // Check if the sanitized input is a valid number
  //     if (!isNaN(sanitizedInput)) {
  //       setInputFunction(sanitizedInput);
  //     }
  //   }
  // };
  // const handleInputChange = (e, setInputFunction) => {
  //   // ตรวจสอบว่าปุ่มที่ถูกกดคือ '-' หรือ 'e'
  //   if (e.target.value.includes('-') || e.target.value.toLowerCase().includes('e')) {
  //     // ไม่อนุญาตให้พิมพ์เครื่องหมายลบหรือตัว 'e' เข้า Input
  //     e.preventDefault();
  //   } else {
  //     const inputValue = e.target.value;
  
  //     // ตรวจสอบว่า input ที่ผู้ใช้พิมพ์เข้ามาไม่มีเครื่องหมายลบ
  //     const sanitizedInput = inputValue.replace(/-/g, '');
  
  //     // ตรวจสอบว่า sanitizedInput เป็นตัวเลขที่ถูกต้อง
  //     if (!isNaN(sanitizedInput)) {
  //       setInputFunction(sanitizedInput);
  //     }
  //   }
  // };
  const handleInputChange = (e, setInputFunction) => {
    const inputValue = e.target.value;
  
    // ตรวจสอบว่า input ที่ผู้ใช้พิมพ์เข้ามาไม่มีเครื่องหมายลบหน้าหรือหลังตัวเลข
    const sanitizedInput = inputValue.replace(/^-|\.$/g, '');
  
    // ตรวจสอบว่า sanitizedInput เป็นตัวเลขที่ถูกต้อง
    if (!isNaN(sanitizedInput)) {
      setInputFunction(sanitizedInput);
    } else {
      // ถ้า sanitizedInput ไม่เป็นตัวเลขที่ถูกต้อง กำหนดค่าเดิม
      setInputFunction('');
    }
  };
  return (
    <>
      <button
        onClick={openModal}
        className="fixed right-0 bottom-0 m-4 mt-20 ml-20 p-2 bg-white rounded-full size-[4.5rem] flex justify-center items-center drop-shadow-md"
      >
        <div
          className="w-11 h-11 bg-white flex items-center justify-center border-4 rounded"
          style={{ borderColor: "#507458" }}
        >
          <FontAwesomeIcon
            icon={faUtensils}
            className="text-xl size-[2rem]"
            style={{ color: "#507458" }}
          />
        </div>
      </button>

      {isModalOpen && (
        <div className="mt-9 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="w-[1000px] h-[600px] px-[63px] py-10 bg-white rounded-[79px] flex-col justify-start items-end gap-[30px] inline-flex">
            <div
              onClick={closeModal}
              className="cursor-pointer text-[#8FA995] text-4xl font-normal"
            >
              ปิด
            </div>
            <div className="w-[859px] text-[#587F61] text-xl text-center font-normal">
              ถ้าไม่กรอกข้อมูลในทั้งสามช่อง
              ปริมาณการบริโภคแคลอรี่ต่อวันจะถูกตั้งค่าเริ่มต้นที่ 1200
            </div>
            <div className="flex-col justify-start items-center gap-[45px] flex text-center">
              <div className="w-[859px] h-[70px] justify-start items-start gap-[22.69px] flex">
                <div className="w-[271.21px] h-[70px] pr-2.5 py-2.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="ml-7 text-[#587F61] text-4xl font-semibold text-left w-full">
                    มื้อเช้า
                  </div>
                </div>
                <div>
                  <div className="w-[565.10px] h-[70px] px-5 py-2.5 bg-zinc-100 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
                    <input
                      type="number"
                      placeholder=" กรุณากรอกแคลอรี่ของคุณ"
                      className="text-[#8FA995] text-2xl font-normal font-['Inter'] w-full outline-none bg-transparent placeholder-[#8FA995]::placeholder"
                      value={breakfastInput}
                      min={0}
                      onChange={(e) => handleInputChange(e, setBreakfastInput)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[859px] h-[70px] justify-start items-start gap-[22.69px] flex">
                <div className="w-[271.21px] h-[70px] pr-2.5 py-2.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="ml-7 text-[#587F61] text-4xl font-semibold text-left w-full">
                    มื้อกลางวัน
                  </div>
                </div>
                <div>
                  <div className="w-[565.10px] h-[70px] px-5 py-2.5 bg-zinc-100 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
                    <input
                      type="number"
                      placeholder=" กรุณากรอกแคลอรี่ของคุณ"
                      className="text-[#8FA995] text-2xl font-normal font-['Inter'] w-full outline-none bg-transparent placeholder-green-500::placeholder"
                      value={lunchInput}
                      min={0}
                      onChange={(e) => handleInputChange(e, setLunchInput)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[859px] h-[70px] justify-start items-start gap-[22.69px] flex">
                <div className="w-[271.21px] h-[70px] pr-2.5 py-2.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="ml-7 text-[#587F61] text-4xl font-semibold text-left w-full">
                    มื้อเย็น
                  </div>
                </div>
                <div>
                  <div className="w-[565.10px] h-[70px] px-5 py-2.5 bg-zinc-100 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
                    <input
                      type="number"
                      placeholder=" กรุณากรอกแคลอรี่ของคุณ"
                      className="text-[#8FA995] text-2xl font-normal font-['Inter'] w-full outline-none bg-transparent placeholder-green-500::placeholder"
                      value={dinnerInput}
                      min={0}
                      onChange={(e) => handleInputChange(e, setDinnerInput)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto w-[859.10px] justify-center items-center gap-[75px] inline-flex">
              <div className="basis-1/3 text-center w-[400px] h-[70px] rounded-md bg-[#587F61] my-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52] justify-center items-center">
                <button
                  className="btn btn-ghost h-full w-full text-white-500 text-3xl font-normal font-['Inter']"
                  onClick={handleCalculate}
                >
                  {" "}
                  คำนวณ
                </button>
              </div>
              {isDataNull && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-md ">
                    
                    <p className="mb- text-neutral-600">
                    กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วนเพื่อทำการคำนวนแคลลอรี่ กดตกลงเพื่อไปใส่ข้อมูล
                    </p>
                    <div className="flex justify-end  mt-6">
                      <button
                        onClick={closeConfirmation}
                        className="text-neutral-500 px-4 py-2 rounded-md mx-2 border-2"
                      >
                        ยกเลิก
                      </button>
                      <button className="bg-[#587F61] text-white px-4 py-2 rounded-md mr-2" onClick={gotoEditData}>
                        <div className=" inline-flex items-center justify-center ">
                          คลิกที่นี้เพื่อไปกรอกข้อมูล
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="basis-1/3 text-center w-[400px] h-[70px] bg-zinc-100 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                <button
                  className="btn btn-ghost h-full w-full  text-neutral-500 text-3xl font-normal font-['Inter']"
                  onClick={clearFunction}
                >
                  รีเซ็ตค่า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isResultModalOpen && (
        <ResultModal
          calculatedBMR={calculatedValues.calculatedBMR}
          calculatedTDEE={calculatedValues.calculatedTDEE}
          calculatedResult={calculatedValues.calculatedResult}
          userInfo={userInfo}
          closeModal={() => setIsResultModalOpen(false)}
          clearFunction={clearFunction}
        />
      )}
    </>
  );
};
export const FREQUENCY_MAP = {
  1: "ไม่ออกกำลังกาย",
  2: "1-3 วันต่อสัปดาห์",
  3: "3-5 วันต่อสัปดาห์",
  4: "6-7 วันต่อสัปดาห์",
  5: "ออกกำลังกายทุกวันเช้า/เย็น",
};

export const GENDER_MAP = {
  male: "ชาย",
  female: "หญิง",
};

export default Calorie;
