import Link from "next/link";
import React from "react";
const Sidebar = () => {
  return (
    <>
      <div>
        <h2 className="text-xl text-blue-500 font-bold text-center mb-2 py-2"> Logo</h2>
      </div>

      <div className="nav-menu pt-5">
        <ul>
          <li>
            <Link href={'/dashboard'} className="py-2 px-3 block hover:bg-blue-100">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={'/blog/create'} className="py-2 px-3 block hover:bg-blue-100">
              Create Blog
            </Link>
          </li>
          <li>
            <Link href={'/blog'} className="py-2 px-3 block hover:bg-blue-100">
              Blog List
            </Link>
          </li>
        </ul>

      </div>
    </>
  )
}


export default Sidebar;