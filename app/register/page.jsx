"use client";
import React from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import useHook from "./useHook";
import Link from "next/link";

export default function page() {
  const { field, handleChange, handleSubmit } = useHook();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url(/images/background_register.png)] bg-cover bg-center bg-no-repeat">
      <div className="w-100 p-6 space-y-6 rounded-2xl shadow-sm border border-gray-100 bg-white/10 backdrop-blur-xl dark:bg-[#0e0e11]">
        <p className="text-gray-600 text-xl font-semibold">
          ลงชื่อเข้าใช้งานในระบบ
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="ID CARD"
              type="text"
              labelPlacement="outside-top"
              variant="underlined"
              size="sm"
              color="default"
              name="citizencardno"
              value={field.citizencardno}
              onChange={handleChange}
              classNames={{ label: "text-md" }}
              placeholder="กรุณากรอกหมายเลขบัตรประชาชน"
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button
                as={Link}
                href="/"
                variant="light"
                className="text-gray-600 dark:text-gray-300"
              >
                กลับ
              </Button>

              <Button type="submit" className="px-6 bg-[#1DD2A2] text-white">
                ยืนยัน
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
