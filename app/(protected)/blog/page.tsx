"use client";

import { API_ENDPOINTS, HEADERS } from "@/app/api/api";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";

async function getBlogs() {
  const res = await fetch(API_ENDPOINTS.blogs.posts);
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}
async function deleteBlog(id: any) {
  const res = await fetch(API_ENDPOINTS.blogs.delete(id), {
    method: "DELETE",
    headers: HEADERS
  });

  if (!res.ok) {
    throw new Error("Failed to Delete Blogs");
  }
  getBlogs();
}
const Blog = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [selectedBlogId, setSelectedsBlogId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
        // console.log("Blogs fetched:", data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    })();
  }, []);

  const handleViewBlog = (id: any) => {
    console.log('editblot', id)
  }
  const handleEditBlog = (id: any) => {
    router.push(`/blog/${id}/edit`);
  }
  const handleDeleteBlog = (id: any) => {
    setSelectedsBlogId(id);
    setOpen(true);
  }

  const confirmDelete = () => {
    deleteBlog(selectedBlogId)
    console.log(selectedBlogId, 'deleted');
    setOpen(false);
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-3 ">
          <h4 className="mb-0 font-xl font-semibold text-grey">Blog List</h4>
          <Link href={'/blog/create'} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded p-2 cursor-pointer px-5">+ Create Blog</Link>
        </div>

        <div className="table w-full">
          <table className="table-auto min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">

              <tr>
                <th className="text-left py-2 px-4 border-b border-gray-200">S.N</th>
                <th className="text-left py-2 px-4 border-b border-gray-200">Title</th>
                <th className="text-left py-2 px-4 border-b border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog: any, index: number) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200" >{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{blog.title}</td>
                  <td className="btn-wrap flex gap-w">
                    <button className="action-button" onClick={() => handleEditBlog(blog.id)}><FiEye /> </button>
                    <button className="action-button" onClick={() => handleEditBlog(blog.id)}><FiEdit /> </button>
                    <button className="action-button" onClick={() => handleDeleteBlog(blog.id)}><FiTrash /> </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-center flex-col items-center">
                    <div className="mx-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-24 mb-5">
                      <FiTrash aria-hidden="true" className="size-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                      <DialogTitle as="h3" className="text-base text-xxl font-semibold text-gray-900">
                        Delete Blog
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you want to sure delete this Blog?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                  <button
                    type="button"
                    onClick={() => confirmDelete()}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    No
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default Blog;