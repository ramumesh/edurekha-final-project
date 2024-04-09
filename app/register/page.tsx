"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import login from '../login/page'
import { useRouter } from 'next/navigation'

const page = () => {

    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();

  async function doRegister(e: any) {
    e.preventDefault();
    setErrMessage("");
    try {
      if (password && password === confirmPassword) {
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          body: JSON.stringify({ email, password, name }),
        });
        const json = await response.json();
        console.log(json);
        if(json && json.message === "user registered"){
          router.push("/login");
        }else{
          setErrMessage("Invalid Credentials");
        }
      }else{
        setErrMessage("Password Mismatch");
      }
    } catch (error) { }
    if (email === "asc@gmail.com" && password === "pwd") {
      router.push("/home");
      setErrMessage("");
    } else {
      setErrMessage("Invalid Credentials");
    }
  }

  return (
    <div><div className="flex items-center min-h-screen bg-gray-100">
    <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
                <Image className="object-cover w-full h-full" width={500} height={500} src="/login_image.jpg" alt="Register" />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                    <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">Create Your Account</h1>
                    <form onSubmit={doRegister}>
                  <div>
                    <label className="block text-sm">Name</label>
                    <input
                      type="text"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="John Doe"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="***************"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm">Confirm Password</label>
                    <input
                      type="password"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="***************"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      Register
                    </button>
                    <div className="text-red-400 ">
                      {errMessage.length > 0 ? errMessage : ""}
                    </div>
                  </div>
                </form>

                    <p className="mt-4 text-xs text-center text-gray-600">
                        Already have an account? <Link href={'/login'} className="text-indigo-600 hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default page