import EditBlog from "@/components/Blogs/EditBlog";
import Link from "next/link";
import Cookies from "js-cookie";
const MyBlog = () => {
  const authToken = Cookies.get("token");
  return (
    <>
      <div
        className="flex items-center justify-center bg-black h-[640px]"
        style={{
          backgroundImage: `url('')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
        }}
      >
        <div className="absolute left-0 ml-5 mt-[400px] ">
          <div className="font-bold text-2xl text-black">username</div>
          <div className="mt-5 text-black">descrtiption</div>
        </div>
      </div>
      <div className="flex  mt-5 item-center justify-end mr-[410px]">
        <Link
          href={`/content/editcontent/${authToken}`}
          className="w-1/12 rounded-md bg-[#587F61] py-3 mx-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]"
        >
          <input type="submit" value="แก้ไขบล็อก" className="ml-4"/>
        </Link>

        <Link
          href={`/content/createcontent/${authToken}`}
          className="w-2/12 rounded-md bg-[#587F61] py-3 mx-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]"
        >
          <input type="submit" value="+ สร้างคอนเทนต์ของคุณ" className="ml-5"/>
        </Link>
      </div>
      <div className="flex items-end justify-end">
        <EditBlog />
      </div>
    </>
  );
};
export default MyBlog;
