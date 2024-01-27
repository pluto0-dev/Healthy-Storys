"use client";
// import EditBlog from "@/components/Blogs/EditBlog";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import { useState, useEffect } from "react";
// import { Directus } from "@directus/sdk";

// const MyBlog = () => {
//   const directus = new Directus("http://localhost:8055")
//   const authToken = Cookies.get("token");
//   const [blogs, setBlogs] = useState([]);
//   const [content, setContent] = useState([]);
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const blogResponse = await directus.items("blog").readByQuery({
//           filter: { user: authToken},
//           limit: 1,
//         });
//         setBlogs(blogResponse.data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         // Fetch content for the specific user's blogs
//         const blogIds = blogs.map(blog => blog.id);
//         const contentResponse = await directus.items("content").readByQuery({
//           filter: { blog: { id: { _in: blogIds } } },
//         });
//         setContent(contentResponse.data);
//         console.log(contentResponse.data);
//       } catch (error) {
//         console.error("Error fetching content:", error);
//       }
//     };

//     fetchContent();
//   }, [blogs]);
//   return (
//     <>
//       <div
//         className="flex items-center justify-center bg-black h-[640px]"
//         style={{
//           backgroundImage: `url('')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           minHeight: "200px",
//         }}
//       >
//         <div className="absolute left-0 ml-5 mt-[400px] ">
//           <div className="font-bold text-2xl text-black">username</div>
//           <div className="mt-5 text-black">descrtiption</div>
//         </div>
//       </div>
//       <div className="flex  mt-5 item-center justify-end mr-[410px]">
//         <Link
//           href={`/content/editcontent/${authToken}`}
//           className="w-1/12 rounded-md bg-[#587F61] py-3 mx-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]"
//         >
//           <input type="submit" value="แก้ไขบล็อก" className="ml-4"/>
//         </Link>

//         <Link
//           href={`/content/createcontent/${authToken}`}
//           className="w-2/12 rounded-md bg-[#587F61] py-3 mx-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]"
//         >
//           <input type="submit" value="+ สร้างคอนเทนต์ของคุณ" className="ml-5"/>
//         </Link>
//       </div>
//       <div className="flex items-end justify-end">
//         <EditBlog />
//       </div>
//     </>
//   );
// };
// export default MyBlog;
"use client";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import Link from "next/link";
import { MoreHorizontal, AlertCircle, Trash2 } from "react-feather";
import Cookies from "js-cookie";

const myBlogs = ({ params }) => {
  const directus = new Directus("http://localhost:8055");
  const assetsUrl = "http://localhost:8055/assets";
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState([]);
  const authToken = Cookies.get("token");
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await directus.items("user").readByQuery({
          filter: { id: params.id },
          limit: 1,
        });
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogResponse = await directus.items("blog").readByQuery({
          filter: { user: params.id },
          limit: 1,
        });
        setBlogs(blogResponse.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch content for the specific user's blogs
        const blogIds = blogs.map((blog) => blog.id);
        const contentResponse = await directus.items("content").readByQuery({
          filter: { blog: { id: { _in: blogIds } } },
        });
        setContent(contentResponse.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [blogs]);
  const openConfirmation = (contentId) => {
    setContentToDelete(contentId);
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setContentToDelete(null);
    setConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      await directus.items("content").deleteOne(contentToDelete);
      setContent((prevContent) =>
        prevContent.filter((item) => item.id !== contentToDelete)
      );
      closeConfirmation();
    } catch (error) {
      console.log("Error deleting content:", error);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center bg-white h-[640px] mt-[75px]"
        style={{
          backgroundImage: `url('${assetsUrl}/${blogs[0]?.banner}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
        }}
      >
        <div className="absolute left-0 mx-10 mt-[400px]">
          <div className="flex items-center">
            <div className="bg-[#EEF2EF] px-4 py-1 rounded-2xl">
              <div className="font-bold text-2xl text-black">
                {user[0]?.username}
              </div>
            </div>
          </div>
          <div className="flex items-center  ">
            <div className="bg-[#EEF2EF] px-3 py-2 rounded-2xl mt-5 text-balance overflow-auto h-28 w-[400px] ">
              <div className=" text-black">{blogs[0]?.description}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  mt-5 item-center justify-end mr-[410px] ">
        <Link
          href={`/blogs/editblog/${blogs[0]?.id}`}
          className="w-1/12 rounded-md bg-[#587F61] mx-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]"
        >
          <input type="submit" value="แก้ไขบล็อก" className="btn btn-ghost h-full w-full" />
        </Link>
        <Link
          href={`/content/createcontent/${params.id}`}
          className="w-2/12 rounded-md bg-[#587F61] mx-2 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]"
        >
          <input type="submit" value="+ สร้างคอนเทนต์ของคุณ" className="btn btn-ghost h-full w-full" />
        </Link>
      </div>
      <div className="flex items-end justify-end">
        <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
          {content.map((content) => (
            <div key={content.id} className="relative">
              <Link
                href={`http://localhost:3000/content/viewcontent/${content.id}`}
                className="card card-side w-[860px] h-[350px] bg-white shadow-xl  "
              >
                <figure>
                  <img
                    src={`${assetsUrl}/${content.preview}`}
                    className="bg-cover h-full w-[380px] mb-2"
                    alt="imgvideo"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title font-bold text-xl text-black w-[380px]">
                    {content.title}
                  </h2>
                </div>
              </Link>
              <div className="absolute top-0 end-0 p-4 ">
                <div className="dropdown dropdown-rigt">
                  <button className="btn m-1 icon bg-white text-black border-none shadow-none hover:bg-white  ">
                    <MoreHorizontal />
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-1 shadow text-black bg-white rounded-box w-52 "
                  >
                    <li>
                      <Link
                        href={`http://localhost:3000/content/editcontent/${content.id}`}
                      >
                        แก้ไข
                      </Link>
                    </li>
                    <li>
                      <div onClick={() => openConfirmation(content.id)}>ลบ</div>
                    </li>
                  </ul>
                </div>
              </div>
              {isConfirmationOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-md ">
                    <div className="text-xl font-bold mb-4 text-black inline-flex items-center">
                      <AlertCircle className="mx-2 text-red-600 font-bold" />{" "}
                      ลบคอนเทนต์
                    </div>
                    <p className="mb- text-neutral-600">
                      คุณต้องการลบข้อมูลนี้หรือไม่? หากถูกลบออกไป
                      ข้อมูลดังกล่าวจะไม่สามารถกู้คืนได้
                    </p>
                    <div className="flex justify-end  mt-6">
                      <button
                        onClick={closeConfirmation}
                        className="text-neutral-500 px-4 py-2 rounded-md mx-2 border-2"
                      >
                        ยกเลิก
                      </button>
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        <div className=" inline-flex items-center justify-center  mt-2">
                          <Trash2 className="mx-1" />
                          ยืนยันการลบข้อมูล
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default myBlogs;
