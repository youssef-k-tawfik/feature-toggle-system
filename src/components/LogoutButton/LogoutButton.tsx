"use client";
import { logout } from "@/libs/redux/features/user/user";
import { RootState } from "@/libs/redux/store";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

export default function LogoutButton() {
  const { userToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (!userToken) return null;

  const handleClick = () => {
    localStorage.removeItem("userToken");
    dispatch(logout());
  };

  return (
    <Link
      href="/"
      className="fixed bottom-16 end-4 bg-[#1b1f23] p-2 rounded-full text-xl"
      onClick={handleClick}
    >
      <LuLogOut className="rotate-180" />
    </Link>
  );
}
