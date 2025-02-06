import { useEffect, useRef, useState } from "react";
import { fetchMessages } from "@/lib/fetchers";
import { useMessages, useSelectedUser, useUser } from "@/store/useStore";
import { shallow } from "zustand/shallow";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import MessageItem from "./MessageItem";
import { io } from "socket.io-client";

export default function MessageList() {
  const sender = useUser((state: any) => state.myUser);
  const receiver = useSelectedUser((state: any) => state.selectedUser);
  const { messages, setMessages } = useMessages(
    (state: any) => ({
      messages: state.messages,
      setMessages: state.setMessages,
    }),
    shallow
  );

  const [parent] = useAutoAnimate();
  const [fetching, setFetching] = useState(true);
  const messagesListEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);

    // Fetch messages initially when the component mounts
    fetchMessages(sender, receiver, setMessages)
      .then(() => setFetching(false)) // Reset fetching flag on success
      .catch(() => setFetching(false)); // Reset fetching flag on error

    socket.on("refresh", () => {
      if (!fetching) {
        // Check if not already fetching
        setFetching(true); // Set fetching flag to true
        fetchMessages(sender, receiver, setMessages)
          .then(() => setFetching(false)) // Reset fetching flag on success
          .catch(() => setFetching(false)); // Reset fetching flag on error
      }
    });

    return () => {
      socket.disconnect();
      socket.off("refresh");
    };
  }, [sender, receiver, setMessages, fetching]); // Include fetching in dependencies

  useEffect(() => {
    if (messagesListEndRef.current) {
      messagesListEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div ref={parent} className="w-full mb-10 flex flex-col max-h-[75vh] overflow-auto no-scrollbar">
      {messages ? messages.map((item: any) => <MessageItem key={item._id} user={sender.username === item.sender} message={item.message} />) : null}
      <div ref={messagesListEndRef} />
    </div>
  );
}