"use client";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { shallow } from "zustand/shallow";
import { useUser } from "@/store/useStore";
import Messages from "@/components/chatThreads/Messages";
import { ChatIcon } from "@livekit/components-react";

export default function Chat() {
  const { myUser, setUser } = useUser((state) => ({ myUser: state.myUser, setUser: state.setUser }), shallow);
  const session = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(session.data?.user);
  }, [session.data?.user, setUser]);

  useEffect(() => {
    if (myUser !== undefined) {
      setLoading(false);
    }
  }, [myUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <div className="flex items-center text-md gap-2">
          <ChatIcon />
          <div className="font-bold">Chit Chat </div>
        </div>
        <div className="flex justify-center ml-2">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        <Sidebar myUser={myUser} />
        <Messages />
      </div>
    </div>
  );
}