"use client";
import { useState } from "react";
import { Directus } from "@directus/sdk";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


const directus = new Directus("http://localhost:8055/");

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const users = await directus.items("user").readByQuery({
        filter: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (users.data.length === 1) {
        const user = users.data[0];
        Cookies.set("token", user.id, { expires: 1 }); // Adjust expiration as needed

        console.log("User logged in successfully:", user);
        alert("Login successful!");
        
        router.push("/");

        
        setTimeout(() => {
            window.location.reload();
        }, 50);
        
      } else {
        console.error("Invalid email or password. Please try again.");
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-28">
      <div className="card card-side bg-white shadow-md w-3/4 rounded-[60px]">
        <figure>
          <img src="/img.png" alt="workout" />
        </figure>
        <form
          className="flex justify-center card-body mx-24"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <h1 className="mt-1 text-black font-bold text-5xl">Hello!</h1>
            <h2 className="text-black text-lg mt-10">Welcome Back</h2>

            <div className="input-box my-2">
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-box my-2">
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex w-11/12 justify-center rounded-md bg-[#587F61] my-2 px-2 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]">
              <button type="submit" className="w-11/12" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
