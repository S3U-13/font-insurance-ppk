"use client";
import React from "react";
import { useDrawer } from "../context/drawProvider";
import { Button } from "@heroui/button";

export default function Navbar() {
  const { openDrawer, setOpenDrawer } = useDrawer();
  return (
    <div className="h-18 w-full p-6 border border-divider rounded-lg flex items-center justify-between px-4">
      <Button
        size="md"
        variant="solid"
        onPress={() => {
          openDrawer === false ? setOpenDrawer(true) : setOpenDrawer(false);
        }}
        isIconOnly
      >
        {openDrawer === false && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {openDrawer === true && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        )}
      </Button>
      <div className="flex items-center gap-4">
        <div className="text-xs">
          <p>
            <strong>DocName:</strong> นพ.ปุญฤทธิ์ กวางทอง
          </p>
          <div className="flex items-center gap-2">
            <p>
              <strong>DocId:</strong> D1137
            </p>
            <p>
              <strong>Group:</strong> อายุรกรรม
            </p>
          </div>
        </div>
        <div className="w-13 h-13 border-2 border-green-600 rounded-full bg-gray-300 overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJ1cM6gCghQwI5w0jX7hHIFMUqPicfZTwpQ&s"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
