// Chatlist.tsx
"use client";
import React, { useEffect } from "react";
import { fetchUsers } from "@/lib/fetchers";
import { shallow } from "zustand/shallow";
import { useAllUsers } from "@/store/useStore";
import ChatItem from "./ChatItem";
import { io } from "socket.io-client";

export default function Chatlist({ myUser, searchTerm }: { myUser: any; searchTerm: string }) {
  const { users, setUsers } = useAllUsers((state: any) => ({ users: state.users, setUsers: state.setUsers }), shallow);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);

    socket.on("new-user", () => {
      fetchUsers(myUser.id, setUsers);
    });
  }, []);

  useEffect(() => {
    fetchUsers(myUser.id, setUsers);
  }, [myUser, setUsers]);

  const filteredUsers = users?.filter((user: any) => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="my-5 flex flex-col">
      {filteredUsers ? (
        filteredUsers.reverse().map((user: any) => (
          <ChatItem key={user._id} user={user} />
        ))
      ) : (
        <div className="flex justify-center items-center p-8">
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index}
                className="w-3 h-3 rounded-full bg-[#99ccc0] animate-pulse"
                style={{ animationDelay: `${index * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </ul>
  );
}
