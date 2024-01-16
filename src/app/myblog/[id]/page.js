'use client'
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
import { MoreHorizontal} from 'react-feather';
const myBlogs = ({ params }) => {
  const directus = new Directus("http://localhost:8055");
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState([]);

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
        const blogIds = blogs.map(blog => blog.id);
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

  

  return (
    <>
      <div
        className="flex items-center justify-center bg-white h-[640px]"
        style={{
          backgroundImage: `url('${""}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
        }}
      >
        <div className="absolute left-0 ml-5 mt-[400px]">
          <div className="font-bold text-2xl text-black">
            {user[0]?.username}
          </div>
          <div className="mt-5 text-black">{blogs[0]?.description}</div>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
          {content.map((content) => (
            <div key={content.id} className="relative">
            <Link
              href={`content/viewcontent/${content.id}`}
              className="card card-side w-[860px] h-[350px] bg-white shadow-xl "
            >
              <figure>
                <img
                  src={
                    "https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                  }
                  alt="imgvideo"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-xl text-black">
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
                    <a>
                      แก้ไข
                    </a>
                  </li>
                  <li>
                    <a>
                     ลบ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default myBlogs;
