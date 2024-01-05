const Home = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen mt-28">
      <p className="mb-4 text-white text-[32px] font-semibold font-['Inter']">สามารถค้นหาบล็อกข่าวที่คุณสนใจได้ที่นี่</p>
      <div className="form-control w-2/4">
        <input
          type="text"
          placeholder="กดเพื่อค้นหา"
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
};

export default Home;
