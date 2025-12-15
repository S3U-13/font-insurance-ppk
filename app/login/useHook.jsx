"use client";
import React, { useState } from "react";
import { loginAPI } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { addToast } from "@heroui/toast";

export default function useHook() {
  const router = useRouter();
  const { login } = useAuth();

  const [field, setField] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // เรียก API
    const data = await loginAPI(field.username, field.password);

    // ❌ ถ้า login ไม่ผ่าน → api จะ return null → ห้าม login()
    if (!data) return;

    // บันทึก user/token เข้า context
    login(data);

    addToast({
      title: "สำเร็จ",
      description: "เข้าสู่ระบบสำเร็จ",
      color: "success",
      variant: "flat",
    });

    // redirect ตาม role
    if (data.data.user?.role === "doctor") {
      router.push("/doctor/");
    } else if (data.data.user?.role === "staff") {
      router.push("/doctor/");
    } else if (data.data.user?.role === "admin") {
      router.push("/admin/user/");
    }
    // else router.push("/dashboard_admin");
  };

  return {
    field,
    handleChange,
    handleSubmit,
  };
}
