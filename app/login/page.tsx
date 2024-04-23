"use client";

import Image from "next/image";
import loginImage from "@/app/assets/images/login.jpg";
import { useFormState } from "react-dom";
import { loginUser } from "../actions/action";

export default function LoginPage() {
  const [state, formAction] = useFormState(loginUser, {
    errorMessage: "",
  });

  return (
    <main>
      <div className="flex items-center min-h-screen bg-gray-100">
        <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <Image
                className="object-cover w-full h-full"
                src={loginImage}
                alt="Image Alt Text"
                priority={true}
                width={500}
                height={500}
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  Login to Your Account
                </h1>
                <form action={formAction}>
                  <div>
                    <label className="block text-sm">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm">Password</label>
                    <input
                      name="password"
                      type="password"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                      placeholder="***************"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      Log In
                    </button>
                    <div className="text-red-400 ">{state?.errorMessage}</div>
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
