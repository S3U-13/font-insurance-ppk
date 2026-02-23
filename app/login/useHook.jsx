"use client";
import React, { useState, useEffect } from "react";
import { loginAPI } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { addToast } from "@heroui/toast";

export default function useHook() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [field, setField] = useState({
    username: "",
    password: "",
  });

  // 🔹 เก็บ callback query จาก HIS ไว้ก่อน login
  useEffect(() => {
    // if (pathname !== "/") return;

    const claimid = searchParams.get("claimid");
    const hn = searchParams.get("hn");
    const patregId = searchParams.get("patregId");

    if (hn && patregId && claimid) {
      sessionStorage.setItem(
        "callbackQuery",
        JSON.stringify({ hn, patregId, claimid }),
      );
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, res } = await loginAPI(field.username, field.password);

    if (!data) return;

    // ✅ login ผ่าน → เก็บ auth state
    login(data);

    if (res.status >= 200 && res.status < 300) {
      addToast({
        title: "สำเร็จ",
        description: "เข้าสู่ระบบสำเร็จ",
        color: "success",
        variant: "flat",
        promise: new Promise((resolve) => setTimeout(resolve, 1200)),
      });
    }
    if (res.status === 400) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "กรุณากรอก user password",
        color: "danger",
        variant: "flat",
      });
    }

    if (res.status === 401) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "user หรือ password ไม่ถูกต้อง",
        color: "danger",
        variant: "flat",
      });
      return;
    }

    // 🔹 ดึง callback query ที่เก็บไว้
    let redirectQuery = "";
    const callbackQuery = sessionStorage.getItem("callbackQuery");

    if (callbackQuery) {
      const { hn, patregId, claimid } = JSON.parse(callbackQuery);
      redirectQuery = `?claimid=${claimid}&hn=${hn}&patregId=${patregId}`;
    }

    // 🔁 redirect ตาม role (role-first pattern)
    if (data.user?.role === "doctor") {
      router.replace(`/doctor`);
      console.log(redirectQuery);
      return;
    }

    if (data.user?.role === "staff") {
      router.replace("/staff");
      return;
    }

    if (data.user?.role === "admin") {
      router.replace("/admin/user");
      return;
    }
  };

  return {
    field,
    handleChange,
    handleSubmit,
  };
}
