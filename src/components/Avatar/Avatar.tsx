"use client";

interface AvatarProps {
  src?: string;
}

export default function Avatar({
  src = "https://wakaw.ca/wp-content/uploads/2020/11/facebook-default-no-profile-pic-300x300-1.jpg",
}: AvatarProps) {
  return (
    <img
      src={src}
      alt="User Avatar"
      width={50}
      height={50}
      className="rounded-full"
    />
  );
}
