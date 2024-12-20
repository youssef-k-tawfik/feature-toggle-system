"use client";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import FeaturesList from "../FeaturesList/FeaturesList";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function SettingsButton() {
  const { userToken } = useSelector((state: RootState) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const handleGearClick = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleGearClick}
        className="bg-[#1b1f23] text-white p-3 rounded-full"
        data-testid="settings-button"
      >
        <FaGear />
      </button>
      <div className="absolute bottom-[115%] end-0 rounded-lg overflow-hidden">
        {showMenu && (
          <IoIosClose
            className="absolute top-0 start-0 text-red-500 hover:text-gray-200 hover:bg-red-500 cursor-pointer rounded-br-sm"
            onClick={() => setShowMenu(false)}
          />
        )}
        {showMenu && (
          <>
            <FeaturesList />
            {userToken && (
              <Link
                href={"/dashboard"}
                className="bg-blue-500 min-w-max block p-2 rounded-b-l"
              >
                Go to Dashboard
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
