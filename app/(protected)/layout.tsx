import React from "react";
import AuthGuard from "../auth/authguard";
import Sidebar from "../common/sidebar";
import Header from "../common/header";
const Layout = ({ children }: any) => {
  return (
    <>
      <AuthGuard>
        <div className="sidebar" >
          <Sidebar />
        </div>
        <main>
          <div className="navbar">
            <Header />
          </div>
          <div className="right-body">
            {children}

          </div>
        </main>
      </AuthGuard>

    </>
  )
}

export default Layout