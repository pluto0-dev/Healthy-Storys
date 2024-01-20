"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const Rulepage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
const router = useRouter()
  useEffect(() => {
    setIsButtonDisabled(!checkboxClicked);
  }, [checkboxClicked]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    console.log("check-box");
  };

  const handleClickCheckbox = () => {
    setCheckboxClicked((prev) => !prev);
  };

  const ruledetail = [
        "1.ไม่อนุญาตอัปโหลดวีดีโอภาพเปลือยหรือเนื้อหาเกี่ยวกับเรื่องเพศ",
        "2.ไม่อนุญาตโพสต์เนื้อหาที่เป็นอันตรายหรือให้โทษ",
        "3.ไม่อนุญาตโพสต์เนื้อหาความเกลียดชัง",
        "4.ห้ามโพสต์วีดีโอเนื้อหารุนแรง",
        "5.ไม่อนุญาตโพสต์วีดีโอและโพสต์ความเห็น บนวีดีโอที่ไม่เหมาะสม และการกลั่นแกล้งบนออนไลน",
        "6.ห้ามสแปม ห้ามสแกม และห้ามใส่ข้อมูลเมตาที่ทำให้เข้าใจผิด",
        "7.ห้ามโพสต์วีดีโอหรือความเห็นเนื้อหาข่มขู่ คุกคาม",
        "8.ห้ามสร้างวีดีโอเนื้อหาที่ละเมิดลิขสิทธิ์ผู้อื่น",
        "9.ข้อมูลส่วนบุคคล",
        "10.ไม่แอบอ้างบุคคลอื่น",
        "11.ไม่อนุญาตโพสต์วีดีโอเนื้อหาการล่วงละเมิดเด็ก",
        "12.ห้ามโพสต์วีดีโอหรือแสดงความเห็นเนื้อหาหยาบคาย",
        "<br /><span style='color: red;'>***หากคุณโพสต์เนื้อหาที่สนับสนุนผู้ใช้อื่นในการละเมิดข้อกำหนดในการให้บริการ เนื้อหาเหล่านั้นอาจะถูกลบ บัญชีของคุณอาจถูกลงโทษ และในบางกรณีอาจถูกยุติการใช้งานได้***</span>",
        "<br /><span style='color: red;'>***ดังนั้นหากไม่อยากให้วีดีโอของคุณถูกลบ ช่องของคุณถูกแบน หรือถูกลบบัญชีถาวร ก็ให้อ่านกฎและปฏิบัติภายใต้เงื่อนไขการอยู่ร่วมกันด้วย***</span>",
      ];

  const details = ruledetail.map((rule, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: rule }} />
      ));

  const handleNextClick = () => {
    router.push("/blogs/create")
    //console.log("Next button clicked!");
    
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="mt-20 text-2xl font-bold text-black">
          กฎข้อห้ามของการลงวิดีโอ
        </h1>
      </div>
      <div className="mt-7 flex justify-start card w-[1000px] h-[550px] relative bg-white rounded-[20px] mx-auto text-clip overflow-y-auto">
        <ul className="m-5 text-black text-xl">{details}</ul>
      </div>
      <div className="flex justify-center mt-5 items-center space-x-2">
        <input
          type="checkbox"
          id="check"
          checked={checkboxClicked}
          onChange={() => handleOptionChange("check")}
          onClick={handleClickCheckbox}
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label htmlFor="check" className="text-black">
          ข้าพเจ้าได้อ่าน เเละเข้าใจรายละเอียดการขอความยินยอมข้างต้น
        </label>
      </div>
      <div className={`flex w-20 justify-center rounded-md mx-auto my-2 px-2 py-3 text-md font-semibold shadow-sm ${checkboxClicked ? 'bg-[#587F61] text-white hover:bg-[#4a6b52]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
        <button onClick={handleNextClick}>
          Next
        </button>
      </div>
    </>
  );
};

export default Rulepage;