// LoginForm.tsx
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res && res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 justify-center items-center bg-image">
      <div className="w-[90%] md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 bg-white rounded-lg shadow-lg border border-[#99ccc0]">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="w-24 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="fill-[#99ccc0]"
                >
                  <path d="M256 0c70.69 0 134.69 28.655 181.018 74.982C483.345 121.31 512 185.31 512 256s-28.655 134.69-74.982 181.018C390.69 483.345 326.69 512 256 512s-134.69-28.655-181.018-74.982C28.655 390.69 0 326.69 0 256S28.655 121.31 74.982 74.982C121.31 28.655 185.31 0 256 0zm-49.371 316.575c-.992-1.286 2.594-10.118 3.443-11.546-9.722-8.651-17.404-17.379-19.041-35.34l-1.043.022c-2.408-.032-4.729-.586-6.903-1.825-3.481-1.979-5.93-5.379-7.583-9.212-3.5-8.043-15.031-34.738 2.537-32.628-9.823-18.345 12.409-49.684-25.935-61.275 31.46-39.845 97.839-101.281 146.483-39.654 53.245 5.16 69.853 68.437 34 103.093 2.101.076 4.08.56 5.832 1.498 6.665 3.57 6.884 11.318 5.132 17.819-1.733 5.429-3.934 9.104-6.01 14.397-2.524 7.147-6.215 8.478-13.345 7.708-.362 17.67-8.528 26.343-19.518 36.724l3.007 10.187c-14.737 31.261-75.957 32.518-101.056.032zM78.752 394.224c12.076-51.533 45.656-33.396 110.338-73.867 22.982 47.952 116.386 51.437 135.54 0 55.35 35.384 98.967 20.923 109.958 72.138 28.965-37.841 46.176-85.158 46.176-136.495 0-62.068-25.158-118.26-65.83-158.934C374.26 56.394 318.068 31.236 256 31.236S137.74 56.394 97.066 97.066C56.394 137.74 31.236 193.932 31.236 256c0 52.123 17.744 100.099 47.516 138.224z" />
                </svg>
              </div>

              <div className="text-3xl font-bold flex flex-col justify-center items-center gap-1 mb-4 text-[#99ccc0]">
                Welcome Back!
                <div className="text-base font-light text-gray-600">
                  Log into your account to continue chatting.
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 focus-within:border-[#99ccc0] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4 text-[#99ccc0]">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input 
                    type="text" 
                    className="grow bg-transparent outline-none placeholder:text-gray-400" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                
                <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 focus-within:border-[#99ccc0] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4 text-[#99ccc0]">
                    <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
                  </svg>
                  <input 
                    type="password" 
                    className="grow bg-transparent outline-none placeholder:text-gray-400" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="w-full bg-[#99ccc0] text-white py-3 rounded-lg hover:bg-[#7fb3a6] transition-colors font-medium"
              >
                Login
              </button>
            </div>
            
            <div className="text-base mt-4 text-center">
              <a href="/signup" className="text-[#99ccc0] hover:text-[#7fb3a6] transition-colors">
                Don&apos;t have an account? Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
      
      {error && (
        <div className="w-[90%] md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}