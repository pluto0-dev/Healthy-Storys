'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from '@/app/api/api'


const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/items/user');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
    {user.map((user, index) => (
      <Link key={index} href={`/blogs/${user.id}`}>
        <a className="card w-[350px] h-[400px] bg-base-100 shadow-xl ">
          <div
            className="card-body "
            style={{ backgroundImage: `url('${user.avatar}')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '200px', borderRadius: '16px'}}
          >
            <h2 className="card-title font-bold text-xl text-black">{user.username}</h2>
          </div>
        </a>
      </Link>
    ))}
  </div>
  )
}

export default User
