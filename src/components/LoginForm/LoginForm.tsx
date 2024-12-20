"use client";
import { login } from "@/redux/features/user/user";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const users = ["admin", "user"];
    if (users.includes(username) && username === password) {
      setErrors(false);
      dispatch(login({ username }));
    } else {
      setErrors(true);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-52 mx-auto">
      <input
        name="username"
        type="text"
        required
        placeholder="Username"
        className="rounded-lg p-1 w-full mb-2 bg-[#0a0a0a] bg-opacity-80 "
      />
      <input
        name="password"
        type="password"
        required
        placeholder="********"
        className="rounded-lg p-1 w-full mb-2 bg-[#0a0a0a] bg-opacity-80 "
      />
      {errors && (
        <p className="mb-2 text-sm text-start">
          Use <span className="font-bold">admin</span> or{" "}
          <span className="font-bold">user</span> as username and password
        </p>
      )}
      <button type="submit" className="bg-blue-500 w-full p-2 rounded-lg">
        Login
      </button>
    </form>
  );
}
