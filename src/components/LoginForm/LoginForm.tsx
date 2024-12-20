"use client";
import { login } from "@/libs/redux/features/user/user";
import { AppDispatch } from "@/libs/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch: AppDispatch = useDispatch();

  const [errors, setErrors] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("username") as string;
    const password = formData.get("password") as string;

    const users = ["admin", "user"];
    if (users.includes(name) && name === password) {
      setErrors(false);
      dispatch(login({ name, password }));
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
