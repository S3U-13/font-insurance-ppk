"use client";
import React, { useState, useEffect } from "react";
import { addToast } from "@heroui/toast";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook({ onClose }) {
  const { searchPatient, getPatRegByVisit, addPatient } = useApiRequest();
  const [hn, setHn] = useState(null);
  const [visitId, setVisitId] = useState("");
  const [visitData, setVisitData] = useState([]);
  const [regId, setRegId] = useState("");
  const [regData, setRegData] = useState([]);

  const handleSearchHn = async () => {
    const data = await searchPatient(Number(hn));
    if (data) {
      setVisitData(data.data);
    }
  };

  const formatThaiDateTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

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
  const formatThaiDateNoTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // useEffect(() => {
  //   if (visitId) {
  //     console.log("visitId:", visitId);
  //   }
  //   if (regId) {
  //     console.log("regId:", regId);
  //   }
  //   if (regData) {
  //     console.log("regData :", regData);
  //   }
  // });

  const handleVisitSelect = async (visitId) => {
    const data = await getPatRegByVisit(visitId);
    if (data) {
      setRegData(data.data);
    }
  };

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const data = await addPatient(hn, regId);
      if (data) {
        onClose();
        setHn("");
        setVisitId("");
        setRegId("");
        setVisitData([]);
        setRegData([]);
        addToast({
          title: "สำเร็จ",
          description: "เพิ่มข้อมูลสำเร็จ",
          color: "success",
          variant: "flat",
          promise: new Promise((resolve) =>
            setTimeout(() => {
              setLoading(false);
              resolve(true);
            }, 1500),
          ),
        });
      } else if (!data) {
        addToast({
          title: "ผิดพลาด",
          description: "ไม่สามารถเพิ่มข้อมูลได้",
          color: "danger",
          variant: "flat",
        });
      }
    } catch (error) {
      addToast({
        title: "error",
        description: "error",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsSubmitting(false); // ✅ ปลดล็อกเสมอ
    }
  };

  const handleReset = () => {
    setHn("");
    setVisitId("");
    setRegId("");
    setVisitData([]);
    setRegData([]);
    addToast({
      title: "สำเร็จ",
      description: "ข้อมูลถูกรีเซ็ตเเล้ว",
      color: "foreground",
      variant: "flat",
    });
  };
  return {
    hn,
    setHn,
    handleSearchHn,
    visitId,
    setVisitId,
    visitData,
    formatThaiDateTime,
    regId,
    setRegId,
    regData,
    handleVisitSelect,
    formatThaiDateNoTime,
    handleSubmit,
    isSubmitting,
    handleReset,
  };
}
