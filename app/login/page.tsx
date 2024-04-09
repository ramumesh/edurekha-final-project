"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();

  async function login(e: any) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      console.log("login message", json.message);
      if (json?.message === "user logged in") {
        console.log("correct", json.message);
        e.preventDefault();
        router.push("/home");
      } else {
        console.log("incorrect", json.message);
        setErrMessage("Invalid Credentials");
      }
    } catch (error) {
      
        setErrMessage("Invalid Credentials");
      

    }
  }

  return (
    <main>
      <div className="flex items-center min-h-screen bg-gray-100">
        <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <Image
                className="object-cover w-full h-full"
                src="/login_image.jpg"
                alt="Image Alt Text"
                priority={true}
                width={500} height={500}
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  Login to Your Account
                </h1>
                <form onSubmit={login}>
                  <div>
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm">Password</label>
                    <input
                      type="password"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                      placeholder="***************"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={login}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      Log In
                    </button>
                    <div className="text-red-400 ">
                      {errMessage.length > 0 ? errMessage : ""}
                    </div>
                  </div>
                </form>

                <p className="mt-4 text-xs text-center text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="register"
                    className="text-indigo-600 hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

