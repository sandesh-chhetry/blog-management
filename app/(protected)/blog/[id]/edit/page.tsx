"use client"
import { API_ENDPOINTS, HEADERS } from "@/app/api/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface Blog {
  title: string;
  body: string;
  userId: number;
}

async function editBlogPost(blog: any) {
  const res = await fetch(API_ENDPOINTS.blogs.create, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(blog)
  });
}

const EditBlog = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<Blog>({
    title: "",
    body: "",
    userId: 1,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(API_ENDPOINTS.blogs.getById(id));
        const data = await res.json();

        setFormData({
          title: data.title,
          body: data.body,
          userId: data.userId,
        });

      } catch (err) {
        console.error("Error loading blog", err);
      }
    }

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_ENDPOINTS.blogs.update(id), {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage("Blog Updated successfully!");

    } catch (error) {
      console.error(error);
    };


  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3 ">
        <h4 className="mb-0 font-xl font-semibold text-grey">Edit Blog</h4>
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
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Body</label>
              <textarea
                name="body"
                value={formData.body}
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
                Update Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditBlog;