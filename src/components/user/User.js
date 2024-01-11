"use client"

// Import necessary modules and components
import { useState, useEffect } from "react";
import Link from "next/link";
import { Directus } from "@directus/sdk";

const User = () => {
  const directus = new Directus('http://localhost:8055');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch user data including image URLs from Directus
        const response = await directus.items('user').readByQuery({ sort: ['id'] });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {users.map((currentUser) => (
        <Link key={currentUser.id} href={`/blogs/${currentUser.id}`}>
          <div className="card w-[350px] h-[400px] bg-base-100 shadow-xl relative">
            <div
              className="card-body"
              style={{
                backgroundImage: `url('${currentUser.image_profile}')`, // Use the image URL from Directus
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
  );
};

export default User;