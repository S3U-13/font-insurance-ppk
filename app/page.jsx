"use client";
import { Button } from "@heroui/button";
import React, { useEffect, useState } from "react";
import useHook from "./useHook";
import LoginDrawer from "./login/page";
import { Link } from "@heroui/link";
export default function page() {
  const { drawerLogin, setDrawerLogin } = useHook();
  return (
    <div
      className={
        drawerLogin
          ? "w-1/2 h-screen bg-gradient-to-br from-green-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-black flex items-center justify-center transition-all duration-500"
          : "w-full h-screen bg-gradient-to-br from-green-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-black flex items-center justify-center transition-all duration-500"
      }
    >
      <div
        className="
      bg-white/80 dark:bg-gray-900/70 
      backdrop-blur-xl 
      shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.6)]
      rounded-3xl 
      border border-purple-200/40 dark:border-purple-900/40 
      p-12 w-full max-w-md space-y-6
    "
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1
            className="
          text-4xl font-extrabold text-[#1DD2A2]"
          >
            PPK PAPERLESS
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            โรงพยาบาลพระปกเกล้า
          </p>
        </div>

        {/* Login Button */}
        <div className="space-y-3">
          <Button
            className="
        w-full py-6 text-xl font-semibold rounded-2xl 
        bg-[#1DD2A2]
        text-white transition-all
      "
            onPress={() => setDrawerLogin(true)}
            // endContent={
            //   <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     fill="none"
            //     viewBox="0 0 24 24"
            //     strokeWidth={1.5}
            //     stroke="currentColor"
            //     className="size-6"
            //   >
            //     <path
            //       strokeLinecap="round"
            //       strokeLinejoin="round"
            //       d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            //     />
            //   </svg>
            // }
          >
           Go to login
          </Button>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs text-gray-400">
              ลงทะเบียนเข้าใช้งานหรือยัง ?
            </p>
            <Link
              className=" hover:text-primary text-sm"
              href="/register/"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} PPK Hospital — All rights reserved
        </p>
      </div>

      <LoginDrawer isOpen={drawerLogin} onClose={() => setDrawerLogin(false)} />
    </div>
  );
}
