"use client";
import React, { useState } from "react";
import { ActivateUser } from "@/utils/api";
import { addToast } from "@heroui/toast";

export default function useHook() {
  const [field, setField] = useState({
    citizencardno: "",
  });
  const [isActivate, setIsActivate] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };
  console.log(isActivate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, res } = await ActivateUser(field.citizencardno);
    if (!data) return;

    if (res.status >= 200 && res.status < 300) {
      setIsActivate(data);
      addToast({
        title: "เปิดใช้ User PPK 11 สำเร็จ",
        description: `Role: ${data.role}`,
        variant: "flat",
        color: "success",
      });
    }
    if (res.status === 400) {
      addToast({
        title: "ไม่สามารถเปิดใช้งาน User ได้",
        description: data.error, // ✅ ดึงจาก response
        color: "danger",
        variant: "flat",
      });
      return null;
    }
    if (res.status === 404) {
      addToast({
        title: "ไม่สามารถเปิดใช้งาน User ได้",
        description: data.error, // ✅ ดึงจาก response
        color: "warning",
        variant: "flat",
      });
      return null;
    }
  };
  return { field, handleChange, handleSubmit };
}
