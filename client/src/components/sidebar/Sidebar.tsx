// Sidebar.tsx
"use client";
import Chatlist from "./Chatlist";
import Searchbar from "./Searchbar";
import React, { useState } from "react";

export default function Sidebar({ myUser }: { myUser: any }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="w-full md:!block sidebar md:w-1/2 lg:w-1/3 p-3 h-screen overflow-y-auto max-sm:fixed bg-white">
      <Searchbar myUser={myUser} onSearch={handleSearch} />
      <Chatlist myUser={myUser} searchTerm={searchTerm} />
    </div>
  );
}