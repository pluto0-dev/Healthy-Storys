'use client'
import { useState } from 'react';
import { Directus } from '@directus/sdk';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a Directus instance
    const directus = new Directus('http://localhost:8055/');

    try {
      // Authenticate user using Directus login endpoint
      const response = await directus.auth
        .login({
          ...formData,
        })
        .toPromise();

      console.log('Login successful:', response);

      // You can redirect the user to another page or perform other actions upon successful login

      // Reset the form data and clear any previous error
      setFormData({
        email: '',
        password: '',
      });
      setError(null);
    } catch (error) {
      console.error('Login failed:', error);
    
      // Log the specific error from the Directus API
      console.error('Directus API Error:', error.response);
    
      // Handle login failure, show a more detailed error message
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-28">
      <div className="card card-side bg-white shadow-md w-3/4 rounded-[60px]">
        <figure>
          <img src="/img.png" alt="workout" />
        </figure>
        <form className="flex justify-center card-body mx-24" onSubmit={handleSubmit}>
          <div className="form-control">
            <h1 className="mt-1 text-black font-bold text-5xl">Hello!</h1>
            <h2 className="text-black text-lg mt-10">Welcome Back</h2>

            {/* Input for email */}
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

            {/* Input for password */}
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

            {/* Error message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit button */}
            <div className="flex w-11/12 justify-center rounded-md bg-[#587F61] my-2 px-2 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]">
              <button type="submit" className="w-11/12">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
