"use client";
import React from "react";
import { useApiRequest } from "../../../../../hooks/useApi";
import { addToast } from "@heroui/toast";

export default function useHook({ onClose }) {
  const { FetchAllFormStatusApproved, ChangeStatus } = useApiRequest();
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
  return { handleUnApprove };
}
