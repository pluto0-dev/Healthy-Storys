 // bg-[url('/bg3.png')] bg-center bg-cover
import User from "@/components/user/User";
const Home = () => {
  return (
    <>
    
      <div className="flex flex-col items-center justify-start h-screen mt-16 bg-[url('/bg3.png')] bg-center bg-cover">
        <p className="mb-4 mt-16 text-white text-[32px] font-medium font-['Inter'] ">
          สามารถค้นหาบล็อกข่าวที่คุณสนใจได้ที่นี่
        </p>
        
        <User />
      </div>
    </>
  );
};

export default Home;
