"use client";
import Image from "next/image";

interface AvatarProps {
  avatarUrl: string;
}

export default function Avatar({ avatarUrl }: AvatarProps) {
  return (
    <div className="avatar flex flex-col items-center gap-4 justify-center">
      <div className="w-24 cursor-pointer rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <Image src={avatarUrl || "/default-avatar.png"} alt="avatar" width={256} height={256} decoding="async" priority />
      </div>
      <span className="label-text-alt">Click to upload a new avatar</span>
    </div>
  );
}
