"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Directus } from "@directus/sdk";
import { MoreHorizontal } from "react-feather";
const User = () => {
  const directus = new Directus("http://localhost:8055");
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Add search state here
  const assetsUrl = "http://localhost:8055/assets";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await directus
          .items("user")
          .readByQuery({ sort: ["id"] });

        const filteredUsers = await Promise.all(
          response.data.map(async (user) => {
            const blogsResponse = await directus
              .items("blog")
              .readByQuery({
                filter: { user: user.id },
                limit: 1,
              });

            if (blogsResponse.data.length > 0) {
              return user;
            }

            return null;
          })
        );

        const filteredUsersWithoutNull = filteredUsers.filter((user) => user !== null);

        setUsers(filteredUsersWithoutNull);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the searchValue
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
    <div className="form-control w-2/4">
          <input
            type="text"
            placeholder="กดเพื่อค้นหา"
            className="input input-bordered w-full placeholder-[#587F61] text-[#587F61] bg-[#EEF2EF]" 
            onChange={(e) => setSearchValue(e.target.value)}
          />

        </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
    {filteredUsers.map((currentUser) => (
        <Link key={currentUser.id} href={`/blogs/viewblog/${currentUser.id}`}>
          <div className="card w-[350px] h-[400px] bg-base-100 shadow-xl relative">
            <div
              className="card-body"
              style={{
                backgroundImage:`url('${assetsUrl}/${currentUser.image_profile}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "200px",
                borderRadius: "16px",
              }}
            >
              <div className="absolute inset-x-20 bottom-0 h-12 px-auto mx-auto backdrop-blur-3xl bg-black/50 rounded-t-lg">
                <h2 className="card-title font-bold text-2xl text-white justify-center mt-2 pb-2">
                  {currentUser.username}
                </h2>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default User;