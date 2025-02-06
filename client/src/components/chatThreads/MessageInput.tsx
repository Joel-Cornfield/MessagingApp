// MessageInput.tsx
"use client";

import { SendMsIcon, SmileFaceIcon } from "@/utils/icons";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Theme } from "emoji-picker-react";
import { Socket, io } from "socket.io-client";
import { useSelectedUser, useUser } from "@/store/useStore";

let socket: Socket;

const Picker = dynamic(
  () => import("emoji-picker-react"),
  { ssr: false }
);

export default function MessageInput() {
  const [inputVal, setInputVal] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const user = useUser((state) => state.myUser);

  function onEmojiClick(emojiObject: { emoji: string }) {
    setInputVal((pre) => pre + emojiObject.emoji);
  }

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_API_URL);
    return () => {
      socket.disconnect();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = null;
    socket.emit("private message", selectedUser.username, inputVal, user.username, imageUrl);
    setInputVal("");
  }

  return (
    <form className="mt-auto relative" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type Message"
          className="w-full pl-14 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#99ccc0] outline-none transition-colors text-gray-800 placeholder:text-gray-400"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
      <button 
        type="button" 
        onClick={() => setShowEmoji(!showEmoji)} 
        className="absolute top-1/2 left-5 -translate-y-1/2 text-[#99ccc0] hover:text-[#7fb3a6] transition-colors"
      >
        <SmileFaceIcon />
      </button>
      {showEmoji && (
        <div className="absolute bottom-full">
          <Picker theme={Theme.LIGHT} onEmojiClick={onEmojiClick} />
        </div>
      )}
      <button 
        type="submit" 
        className="absolute top-1/2 right-5 -translate-y-1/2 text-[#99ccc0] hover:text-[#7fb3a6] transition-colors"
      >
        <SendMsIcon />
      </button>
    </form>
  );
}