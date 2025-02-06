// TopBar.tsx
import { userProps } from "@/types";
import { FlashIcon } from "@/utils/icons";
import React from "react";
import Image from "next/image";
import { DateTime } from "luxon";

export default function TopBar({ selectedUser }: { selectedUser: userProps }) {
  function formatDate(timestamp: any) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    document.querySelector(".messages")?.classList.add("hidden");
    document.querySelector(".sidebar")?.classList.remove("hidden");
    document.querySelector(".selected-user")?.classList.remove("selected-user");
  }

  return (
    <div className={`${selectedUser ? "bg-white border-b border-[#99ccc0]" : "md:hidden"} max-sm:fixed max-sm:z-10 max-sm:w-full`}>
      <div className="w-full px-3 py-4 flex justify-between items-center">
        <div className="flex gap-3">
          <button 
            onClick={handleClick} 
            className="md:hidden text-[#99ccc0] hover:text-[#7fb3a6] transition-colors"
          >
            <FlashIcon />
          </button>
          <div className="relative ml-5">
            <div className="w-12 h-12 rounded-full ring-2 ring-[#99ccc0] ring-offset-2">
              {selectedUser?.avatarUrl && (
                <Image
                  src={selectedUser.avatarUrl}
                  width={50}
                  height={50}
                  alt="avatar"
                  className="rounded-full"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            {selectedUser?.username && (
              <h3 className="font-semibold text-[#99ccc0] text-xl">
                {selectedUser.username}
              </h3>
            )}
            <p className="text-gray-500">
              {`Joined ${formatDate(selectedUser.createdAt)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
