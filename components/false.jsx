"use client";
import React from "react";

export default function False() {
  return (
    <div className="w-full h-[55vh] flex items-center justify-center ">
      <div className="w-full max-w-md mx-auto border border-divider shadow-xl rounded-3xl  p-4 text-center">
        {/* Icon + Title */}
        <div className="flex gap-2 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="size-12 "
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
            ไม่สามารถแสดงไฟล์ PDF ได้
          </h2>
        </div>

        {/* Image */}
        <div className="w-40 h-60 mx-auto mb-6">
          <img
            src="/images/not-found.png"
            className="rounded-xl object-contain opacity-90"
            alt="not-found"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-white text-base leading-relaxed ">
            เกิดข้อผิดพลาดระหว่างการสร้างไฟล์ PDF
            <br />
            กรุณาลองใหม่อีกครั้ง หรือแจ้งเจ้าหน้าที่เพื่อทำการตรวจสอบ
          </p>
        </div>

        {/* Button */}
        <button
          className="px-7 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium shadow-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-800 active:scale-[.98] transition-all duration-150"
          onClick={() => window.location.reload()}
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    </div>
  );
}
