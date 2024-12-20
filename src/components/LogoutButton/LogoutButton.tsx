"use client";
import { logout } from "@/libs/redux/features/user/user";
import { AppDispatch, RootState } from "@/libs/redux/store";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

export default function LogoutButton() {
  const { userToken } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  if (!userToken) return null;

  const handleClick = () => {
    localStorage.removeItem("userToken");
    dispatch(logout());
  };

  return (
    <Link
      href="/"
      className="border-2 border-gray-500 fixed bottom-16 end-4 bg-[#1b1f23] p-2 rounded-full text-2xl hover:text-blue-500"
      onClick={handleClick}
      title="Logout"
    >
      <LuLogOut className="rotate-180" />
    </Link>
  );
}
