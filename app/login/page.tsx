"use client";
import React, { useEffect, useState } from "react";
import { isLoggedIn, saveToken } from "../auth/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  let users = [
    {
      "email": "test@gmail.com",
      "password": "123456",
      "name": "Sandesh Chhetry",
      "role": "admin"
    }
  ]

  function getUser(email: string, password: string) {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  }

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  const handleLogin = () => {
    const user = getUser(email, password);
    if (user) {
      let dummyToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImMyMjgwMzM2MGFiMWNhNGJjZDk5M2YyOTc0MzcwYmM2IiwibmFtZSI6InNhbmRlc2ggY2hoZXRyeSIsInJvbGUiOiJhZG1pbiJ9.e30.GI-1R-5v-vKBXDA8_XsO4Jcdg-sXGpyY47TICmZExEIav8BNq0y8jufehJl2CWOyI9_B9Vd0OTh6ylnD-knn5w";

      saveToken(dummyToken);
      router.push("/dashboard");
    } else {
      setErrorMessage("Invalid credentials");
    }
  };
  return (
    <>
      <div className="login-body">
        <div className="login-wrapper p-2 bg-white rounded-md p-5 mb-5">
          <div>
            <h3 className="text-xl font-semibold text-grey mb-1">Welcome to Login</h3>
            <p className="text-md text-grey mb-3">login to continue</p>
            {/* <p className="text-md text-grey text-center mb-3">username: test@gmail.com / password: 123456</p> */}

          </div>
          <div>
            <div className="form-group mb-3">

              <label className="mb-1 block">Username</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="mb-1 block">Password</label>

              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center text-sm mt-3">{errorMessage}</p>

            )}

            <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white w-full rounded p-2 mt-4 cursor-pointer">Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;