"use client";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import { registerUser } from "../actions/action";

const page = () => {
  const [state, formAction] = useFormState(registerUser, {
    errorMessage: "",
  });
  return (
    <div>
      <div className="flex items-center min-h-screen bg-gray-100">
        <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <Image
                className="object-cover w-full h-full"
                width={500}
                height={500}
                src="/login_image.jpg"
                alt="Register"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  Create Your Account
                </h1>
                <form action={formAction}>
                  <div>
                    <label className="block text-sm">Name</label>
                    <input
                      name="name"
                      type="text"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mt-4">
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
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="***************"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="***************"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      Register
                    </button>
                    {<div className="text-red-400 ">{state?.errorMessage}</div>}
                  </div>
                </form>

                <p className="mt-4 text-xs text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="text-indigo-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
