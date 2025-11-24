"use client"
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isLoggedIn } from "./auth";

const AuthGuard = ({ children }: any) => {
  const [loggedUser, setLoggedUser] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    } else {
      setLoggedUser(true);
    }
  }, [pathname]);
  if (!loggedUser) return null;

  return (
    <>
      {children}
    </>
  )
}

export default AuthGuard;