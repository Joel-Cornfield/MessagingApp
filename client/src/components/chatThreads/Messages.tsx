// Messages.tsx
"use client";
import { useSelectedUser } from "@/store/useStore";
import TopBar from "./TopBar";
import MesssageList from "./MessageList";
import MessageInput from "./MessageInput";
import Image from "next/image";
import icon from "../../app/favicon.ico";

export default function Messages() {
  const selectedUser = useSelectedUser((state) => state.selectedUser);

  if (!selectedUser) {
    return (
      <div className="bg-image w-full min-h-screen z-0 hidden md:w-1/2 lg:w-2/3 md:flex md:flex-col flex-col">
        <div className="min-h-screen flex flex-col justify-center items-center gap-1 p-8">
          <div className="flex items-center gap-4">
            <Image width={65} height={65} src={icon} alt="icon" />
            <div className="text-4xl font-bold mt-4 text-[#99ccc0]">
              Welcome to Chit Chat
            </div>
          </div>
          <div className="text-gray-600 text-lg">
            Select the users on the sidebar and start chit chatting.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-image w-full min-h-screen z-0 hidden md:w-1/2 lg:w-2/3 md:flex md:flex-col flex-col">
      <TopBar selectedUser={selectedUser} />
      <div className={`max-w-sm md:max-w-3xl w-full mx-auto mt-auto mb-10 ${selectedUser ? "" : "md:hidden"}`}>
        <MesssageList />
        <MessageInput />
      </div>
    </div>
  );
}