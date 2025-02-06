// Searchbar.tsx
"use client";

import { SearchIcon } from "@/utils/icons";
import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Searchbar({ myUser, onSearch }: { myUser: any; onSearch: (searchTerm: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full ring-2 ring-[#99ccc0] ring-offset-2">
          <Image
            src={myUser.avatarUrl || "/default-avatar.png"}
            width={48}
            height={48}
            alt="avatar"
            className="rounded-full"
            priority={true}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full pl-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:border-[#99ccc0] outline-none transition-colors text-[#99ccc0] placeholder:text-[#99ccc0]"
        />
        <div className="w-6 h-6 absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 text-[#99ccc0]">
          <SearchIcon />
        </div>
      </div>
      
      <button 
        onClick={() => signOut()} 
        className="px-4 py-2 border-2 border-[#99ccc0] hover:bg-[#99ccc0] text-[#99ccc0] hover:text-white rounded-full transition-colors flex items-center gap-2"
      >
        <div className="hidden md:block">Logout</div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="fill-current">
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </svg>
      </button>
    </div>
  );
}