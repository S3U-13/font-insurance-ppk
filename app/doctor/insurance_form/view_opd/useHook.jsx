"use client";
import React from "react";

export default function useHook({ claimData }) {
  const keyRelated = claimData?.hospitalForm?.relatedConditionIds ?? [];
  const sortedIds = [...keyRelated].sort((a, b) => a - b);

  const choice2 = [
    {
      id: 1,
      value:
        "Pregnancy / Childbirth / Infertility / Caesarean section / Miscarriage",
    },
    {
      id: 2,
      value: "Nervous / Mental / Emotional / Sleeping disorder",
    },
    {
      id: 3,
      value: "Cosmetic reason / Dental care / Refractive errors correction",
    },
    {
      id: 4,
      value: "Congenital / Hereditary disease",
    },
    {
      id: 5,
      value: "Influence of Drugs / Alcohol",
    },
    {
      id: 6,
      value: "AIDS",
    },
  ];

  const matchedChoices = sortedIds
    .map((id) => choice2.find((item) => item.id === id))
    .filter(Boolean);

  const formatThaiDateNoTime = (isoString) => {
    if (!isoString || isoString === "-") return "-";

    const date = new Date(isoString);

    if (isNaN(date)) return "-"; // กัน error ตรงนี้สำคัญ!

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
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

  const convertISOToTime = (isoString) => {
    if (!isoString) return null;

    const d = new Date(isoString);
    return new Time(d.getHours(), d.getMinutes(), d.getSeconds());
  };

  const formatAddress = (pat_address) => {
    if (!pat_address) return "";

    // ถ้าเป็น string แล้ว → คืนค่าเลย
    if (typeof pat_address === "string") return pat_address;

    let address = "";

    if (pat_address[0]?.house) address += `${pat_address[0]?.house}`;
    if (pat_address[0]?.moo) address += ` หมู่ ${pat_address[0]?.moo}`;
    if (pat_address[0]?.soy) address += ` ซอย ${pat_address[0]?.soy}`;
    if (pat_address[0]?.road) address += ` ถนน ${pat_address[0]?.road}`;

    // ใช้รหัสแทน detail (เพราะ detail = null)
    if (pat_address[0]?.tambonName?.detailtext)
      address += ` ต.${pat_address[0]?.tambonName.detailtext}`;
    if (pat_address[0]?.amphurName?.detailtext)
      address += ` อ.${pat_address[0]?.amphurName.detailtext}`;
    if (pat_address[0]?.provinceName?.detailtext)
      address += ` จ.${pat_address[0]?.provinceName.detailtext}`;

    return address.trim();
  };
  const formatTimeNoDate = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };
  return {
    formatThaiDateNoTime,
    calculateAge,
    formatAddress,
    formatTimeNoDate,
    matchedChoices,
  };
}
