"use client";
import { focusInputComment } from "@/redux/features/systemFeatures/systemFeatures";
import { togglePostLike } from "@/redux/features/post/post";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Features() {
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const { liked } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  // Tooltip State used to show the tooltip when the user clicks on share the feature
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // The function decides which feature to trigger based on the name
  const handleClick = (name: string) => {
    switch (name) {
      case "like":
        dispatch(togglePostLike());
        break;
      case "comment":
        dispatch(focusInputComment());
        break;
      case "share":
        // copies the url to the clipboard telling the user for 2 seconds
        navigator.clipboard.writeText("http://localhost:3000");
        setIsTooltipVisible(true);
        setTimeout(() => setIsTooltipVisible(false), 2000);
        break;
      default:
        console.error("Invalid Feature Encountered:", name);
        break;
    }
  };

  return (
    <div className="flex mb-2 gap-1 relative">
      {features.map((feature) => (
        <button
          key={feature.id}
          disabled={!feature.enabled}
          onClick={() => handleClick(feature.name)}
          className={`flex-grow disabled:cursor-not-allowed text-blue-500 enabled:hover:bg-blue-500 enabled:hover:bg-opacity-30 p-2 ${
            feature.name === "like" && liked
              ? "bg-blue-500 text-white enabled:hover:bg-opacity-90 disabled:hover:bg-opacity-100"
              : ""
          }`}
        >
          {feature.name}
        </button>
      ))}
      {isTooltipVisible && (
        <div className="absolute start-full border-white border bg-[#1b1f23] p-2 rounded-lg text-white">
          Copied!
        </div>
      )}
    </div>
  );
}
