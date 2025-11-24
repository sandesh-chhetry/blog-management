import Link from "next/link";
import React from "react";
const PageNotFound = () => {
  return (
    <>
      <div className="page-not-found text-center">
        <div>
          <h2 className="text-xl font-bold text-red-500">Error 404 !!!</h2>
          <h2 className="text-xxl font-bold mb-3">Page Not Found</h2>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded p-2 cursor-pointer px-5 py-3"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </>
  )
}

export default PageNotFound;