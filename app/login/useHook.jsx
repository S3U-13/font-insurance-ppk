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
    const { data, res } = await loginAPI(field.username, field.password);

    // ❌ ถ้า login ไม่ผ่าน → api จะ return null → ห้าม login()
    login(data);
    if (!data) return;

    // บันทึก user/token เข้า context

    if (res.status >= 200 && res.status < 300) {
      addToast({
        title: "สำเร็จ",
        description: "เข้าสู่ระบบสำเร็จ",
        color: "success",
        variant: "flat",
        promise: new Promise((resolve) => setTimeout(resolve, 2000)),
      });
    }
    if (res.status === 400) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "กรุณากรอก user password",
        color: "danger",
        variant: "flat",
      });
      return null; // ❌ ไม่ throw
    }
    if (res.status === 401) {
      addToast({
        title: "ไม่สำเร็จ",
        description: " user หรือ password ไม่ถูกต้อง",
        color: "danger",
        variant: "flat",
      });
      return null; // ❌ ไม่ throw
    }
    // redirect ตาม role
    if (data.user?.role === "doctor") {
      router.push("/doctor/");
    } else if (data.user?.role === "staff") {
      router.push("/staff/");
    } else if (data.user?.role === "admin") {
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
