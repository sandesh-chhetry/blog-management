"use client"
import { API_ENDPOINTS, HEADERS } from "@/app/api/api";
import Link from "next/link";
import React, { useState } from "react";
interface Blog {
  title: string;
  body: string;
  userId: number;
}

async function createBlogPost(blog: any) {
  const res = await fetch(API_ENDPOINTS.blogs.create, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(blog)
  });
}

const CreateBlog = () => {
  const [blog, setBlog] = useState<Blog>({
    title: "",
    body: "",
    userId: 1,
  });
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Blog submitted:", blog);
    createBlogPost(blog);

    setMessage("Blog created successfully!");
    setBlog({ title: "", body: "", userId: 1 });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3 ">
        <h4 className="mb-0 font-xl font-semibold text-grey">Create Blog</h4>
        <Link href={'/blog'} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded p-2 cursor-pointer px-5">List Blog</Link>
      </div>

      <div>
        <div className="">


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Body</label>
              <textarea
                name="body"
                value={blog.body}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                rows={4}
                required
              />
            </div>
            {message && <div className="mb-4 text-green-600 text-center">{message}</div>}


            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateBlog;