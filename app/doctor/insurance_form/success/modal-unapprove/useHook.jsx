"use client";
import React, { useState } from "react";
import { useApiRequest } from "../../../../../hooks/useApi";
import { addToast } from "@heroui/toast";

export default function useHook({ onClose }) {
  const { ChangeStatus } = useApiRequest();
  const [loading, setLoading] = useState(true);
  const handleUnApprove = async (claimId, changeStatus) => {
    if (!changeStatus || !claimId) return;

    try {
      const data = await ChangeStatus(claimId, changeStatus);

      if (data) {
        onClose();
        if (data) {
          addToast({
            title: "สำเร็จ",
            description: "ยืนยันสำเร็จ",
            color: "success",
            variant: "flat",
            promise: new Promise((resolve) =>
              setTimeout(() => {
                setLoading(false);
                resolve(true);
              }, 1500)
            ),
          });
        } else if (!data) {
          addToast({
            title: "ผิดพลาด",
            description: "ยืนยันไม่สำเร็จ",
            color: "danger",
            variant: "flat",
          });
        }
      }
      return data;
    } catch (err) {
      console.error("handleApprove error :", err);
    }
  };
  const calculateAge = (birthdate) => {
    if (!birthdate) return "";

    const birth = new Date(birthdate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // ถ้ายังไม่ถึงวันเกิดของเดือนนี้ → เดือนติดลบ
    if (days < 0) {
      months--;
    }

    // ถ้าเดือนติดลบ → ลดปีลง 1 และเพิ่มเดือนให้กลับมาเป็นบวก
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  const formatThaiDateTime = (isoString) => {
    if (!isoString || isoString === "-") return "-";

    const date = new Date(isoString);

    if (isNaN(date)) return "-"; // กัน error ตรงนี้สำคัญ!

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };
  return { handleUnApprove, calculateAge, formatThaiDateTime };
}
