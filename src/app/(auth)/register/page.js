'use client'
import { Directus } from '@directus/sdk';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const directus = new Directus('http://localhost:8055/');

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const isSpecialCharacter = (str) => /[!#$%^&*(),?":{}|<>]/.test(str);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    // Check email format
    if (!formData.email.endsWith('@gmail.com') && !formData.email.endsWith('@hotmail.com') && !formData.email.endsWith('@northbkk.ac.th')) {
      newErrors.email = 'Please enter a valid email address';
    }
  
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password and confirm password do not match.';
    }
  
    // Check for empty fields and special characters
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `Please enter your ${key === 'confirmPassword' ? 'confirm password' : key}.`;
      } else if (isSpecialCharacter(value)) {
        newErrors[key] = `Special characters are not allowed in ${key}.`;
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      // Send data to Directus
      const response = await directus.items('user').createOne({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
  
      console.log('User registered successfully:', response);
  
      alert('Registration successful!');
      router.push('/login');
      // Redirect to Home page
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-28 bg-[#cbd7ce]">
      <div className="card card-side bg-white rounded-[60px] w-3/4">
        <figure>
          <img src="/img.png" alt="workout" />
        </figure>
        <form className="flex justify-center card-body mx-24" onSubmit={handleSubmit}>
          <div className="form-control">
            <h1 className="mt-1 text-black font-bold text-5xl">Hello!</h1>
            <h2 className="text-black text-lg mt-10">Register to get started</h2>

            {['email', 'username', 'password', 'confirmPassword'].map((field) => (
              <div key={field} className="input-box my-2">
                <input
                  type={field.includes('password') ? 'password' : 'text'}
                  placeholder={`Enter your ${field === 'confirmPassword' ? 'confirm password' : field}`}
                  className="input input-bordered w-full max-w-xs bg-[#cbd7ce] placeholder-[#587F61] text-[#587F61]"
                  required
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {errors[field] && <div className="text-red-500">{errors[field]}</div>}
              </div>
            ))}

            <div className="flex w-11/12 justify-center rounded-md bg-[#587F61] my-2 px-2 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#4a6b52]">
              <input type="submit" value="Register" className="w-11/12" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
