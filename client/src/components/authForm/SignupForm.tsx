// SignupForm.tsx
"use client";
import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

export default function SignupForm() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const socket = io(process.env.NEXT_PUBLIC_API_URL);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "default");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setAvatarUrl(data.secure_url);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !username || !password || !confirmPass) {
      setError("All fields are necessary.");
      return;
    } else if (password !== confirmPass) {
      setError("Passwords must match.");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPass,
          avatarUrl,
        }),
      });

      if (res.ok) {
        setError("");
        socket.emit("joined", "new user");
        router.push("/login");
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 justify-center items-center bg-image">
      <div className="w-[90%] md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 bg-white rounded-lg shadow-lg border border-[#99ccc0]">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="text-3xl font-bold text-center text-[#99ccc0] mb-4">
                Sign Up
                <div className="text-base font-light text-gray-600">
                  Register an account to start chatting.
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Avatar avatarUrl={avatarUrl} />
                <label className="w-full flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-[#99ccc0] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="text-gray-600">Choose profile picture</span>
                </label>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { type: "email", placeholder: "Email", value: email, setter: setEmail },
                  { type: "text", placeholder: "Username", value: username, setter: setUsername },
                  { type: "password", placeholder: "Password", value: password, setter: setPassword },
                  { type: "password", placeholder: "Confirm Password", value: confirmPass, setter: setConfirmPass }
                ].map((field) => (
                  <label key={field.placeholder} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 focus-within:border-[#99ccc0] transition-colors">
                    <input
                      type={field.type}
                      className="grow bg-transparent outline-none placeholder:text-gray-400"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full bg-[#99ccc0] text-white py-3 rounded-lg hover:bg-[#7fb3a6] transition-colors font-medium">
                Sign Up
              </button>
            </div>

            <div className="text-base mt-4 text-center">
              <a href="/login" className="text-[#99ccc0] hover:text-[#7fb3a6] transition-colors">
                Already have an account? Log in
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