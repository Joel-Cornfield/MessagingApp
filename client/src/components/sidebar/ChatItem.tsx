// ChatItem.tsx
"use client";
import { useSelectedUser } from "@/store/useStore";
import { userProps } from "@/types";
import Image from "next/image";
import { DateTime } from "luxon";

export default function ChatItem({ user }: { user: userProps }) {
  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);

  function formatDate(timestamp: any) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    document.querySelector(".messages")?.classList.remove("hidden");
    document.querySelector(".messages")?.classList.add("flex");
    document.querySelector(".sidebar")?.classList.add("hidden");
    document.querySelector(".selected-user")?.classList.remove("selected-user");
    e.currentTarget.classList.add("selected-user");
    setSelectedUser(user);
  }

  return (
    <>
      <li 
        onClick={handleClick} 
        className="flex gap-5 cursor-pointer hover:bg-[#f0f7f5] p-5 rounded-lg transition-colors"
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-full ring-2 ring-[#99ccc0] ring-offset-2">
            <Image
              src={user.avatarUrl || "/default-avatar.png"}
              alt="avatar"
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-gray-600 text-lg">{user.username}</h3>
          <p className="text-gray-500">{`Joined ${formatDate(user.createdAt)}`}</p>
        </div>
      </li>
      <div className="border-b opacity-20 my-0"></div>
    </>
  );
}