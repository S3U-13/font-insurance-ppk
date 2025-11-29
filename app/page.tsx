"use client";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import useHook from "./useHook";
import LoginDrawer from "./login/page";
export default function page() {
  const { drawerLogin, setDrawerLogin } = useHook();
  return (
    <div
      className={
        drawerLogin
          ? "w-1/2 h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center transition-all duration-500"
          : "w-full h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center transition-all duration-500"
      }
    >
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-purple-200/40 p-12 w-full max-w-md space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            PPK PAPERLESS
          </h1>
          <p className="text-gray-500 text-sm">โรงพยาบาลพระปกเกล้า</p>
        </div>

        {/* Login Button */}
        <Button
          className="w-full py-6 text-xl font-semibold rounded-2xl 
      bg-gradient-to-r from-purple-600 to-indigo-500 
      shadow-[0_8px_30px_rgba(110,80,255,0.35)]
      hover:shadow-[0_10px_35px_rgba(110,80,255,0.55)]
      text-white transition-all"
          onPress={() => setDrawerLogin(true)}
          endContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          }
        >
          Login
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} PPK Hospital — All rights reserved
        </p>
      </div>
      <LoginDrawer isOpen={drawerLogin} onClose={() => setDrawerLogin(false)} />
    </div>
  );
}
