"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function PostStatistics() {
  const { likesCount, commentsCount, sharesCount } = useSelector(
    (state: RootState) => state.post
  );

  return (
    <div className="flex gap-2">
      <p>
        {likesCount} <span className="text-gray-400">Likes</span>
      </p>
      <p>
        {commentsCount} <span className="text-gray-400">Comments</span>
      </p>
      <p>
        {sharesCount} <span className="text-gray-400">Shares</span>
      </p>
    </div>
  );
}
