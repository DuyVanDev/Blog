"use client";
import React, { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../../../../../context/AuthContext";
import { Button, Divider, Inputbox, Logo } from "@/components";
import { Toaster } from "sonner";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="flex w-full  h-[100vh]">
      <div className="hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center">
        <Logo type="sigin" />
        <span className="text-xl font-semibold text-white">Welcome, back!</span>
      </div>

      <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black items-center px-10 md:px-20 lg:px-40">
        <div className="h-full flex flex-col items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
          <div className="block mb-10 md:hidden">
            <Logo />
          </div>
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold ">
                Đăng nhập với tài khoản của bạn
              </h2>
            </div>

            <Button
              // onClick={() => googleLogin()}
              label="Đăng nhập với Google"
              icon={<FcGoogle className="" />}
              styles="w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent  px-5 py-2.5 rounded-full border border-gray-300"
            />

            <Divider label="Hoặc đăng nhập với email" />

            <form className="mt-8 space-y-6" onSubmit={loginUser} >
              <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-5">
                <Inputbox
                  label="Email"
                  name="username"
                  type="text"
                  isRequired={true}
                  placeholder="email@example.com"
                  // value={data?.email}
                  // onChange={handleChange}
                />

                <Inputbox
                  label="Password"
                  name="password"
                  type="password"
                  isRequired={true}
                  placeholder="Password"
                  // value={data?.password}
                  // onChange={handleChange}
                />
              </div>

              <Button
                label=" Đăng nhập"
                type="submit"
                styles="group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mt-8"
              />
            </form>

            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
              <p>
                Bạn chưa có tài khoản?{" "}
                <Link href="/dashboard/register" className="text-rose-800 font-medium">
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toaster richColors />
    </div>
    
  );
};

export default Login;
