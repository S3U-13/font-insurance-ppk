"use client";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import useHook from "./useHook";
import LoginDrawer from "./login/page";
export default function page() {
  const { drawerLogin, setDrawerLogin } = useHook();
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-10 w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-wide text-gray-800">
            PPK PAPERLESS
          </h1>
          <p className="text-gray-500 text-sm">โรงพยาบาลพระปกเกล้า</p>
        </div>

        {/* Login Button */}
        <Button
          className="w-full py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
          color="primary"
          variant="solid"
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

        {/* Optional Footer */}
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} PPK Hospital — All rights reserved
        </p>
        <LoginDrawer
          isOpen={drawerLogin}
          onClose={() => setDrawerLogin(false)}
        />
      </div>
    </div>
  );
}
