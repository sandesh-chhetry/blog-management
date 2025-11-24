"use client"
import React from "react";
import { useRouter } from "next/navigation";
const Dashboard = () => {

  const router = useRouter();
  const handleShowBlogs = () => {
    router.push("/blog");
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="card rounded p-4 bg-blue-100 cursor-pointer" onClick={handleShowBlogs}>
          <h2 className="text-lg text-grey font-md">Blogs</h2>
          <h2 className="text-xl font-bold">100</h2>
        </div>
      </div>
    </>
  )
}

export default Dashboard