"use client"
import React from "react";
import { removeToken } from "../auth/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  }
  return (

    <>
      <div className="bg-white w-full p-4">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-lg">Greeting <span className="text-blue-500 font-semibold">Sandesh Chhetry!!!</span></h3>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded p-2 cursor-pointer px-5" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  )
}

export default Header;