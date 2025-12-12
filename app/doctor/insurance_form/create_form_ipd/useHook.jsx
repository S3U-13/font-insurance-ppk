"use client";
import React, { useState } from "react";

export default function useHook() {
  const [sex, setSex] = useState([
    {
      id: 1,
      value: "ชาย",
    },
    {
      id: 2,
      value: "หญิง",
    },
  ]);
  const [choice1, setChoice1] = useState([
    {
      id: 1,
      value: "มี",
    },
    {
      id: 2,
      value: "ไม่มี",
    },
  ]);
  const [sick, setSick] = useState([
    {
      id: 1,
      value: "เจ็บป่วย",
    },
    {
      id: 2,
      value: "บาดเจ็บ",
    },
  ]);
  const [everOrNever, setEverOrNever] = useState([
    {
      id: 1,
      value: "ไม่เคยรักษา",
    },
    {
      id: 2,
      value: "เคยรักษา",
    },
  ]);
  const [choice2, setChoice2] = useState([
    {
      id: 1,
      value:
        "Pregnancy / Childbirth / Infertility / Caesarean section / Miscarriage",
    },
    {
      id: 2,
      value: "Congenital / Hereditary disease",
    },
    {
      id: 3,
      value: "Nervous / Mental / Emotional / Sleeping disorder",
    },
    {
      id: 4,
      value: "Influence of Drugs / Alcohol",
    },
    {
      id: 5,
      value: "Cosmetic reason / Dental care / Refractive errors correction",
    },
    {
      id: 6,
      value: "AIDS",
    },
    {
      id: 7,
      value: "An accident; Date of accident",
    },
  ]);
  const [yesOrNo, setYesOrNo] = useState([
    {
      id: 1,
      value: "Yes",
    },
    {
      id: 2,
      value: "No",
    },
  ]);
  const [choice3, setChoice3] = useState([
    {
      id: 1,
      value: "No",
    },
    {
      id: 2,
      value: "Not Know",
    },
    {
      id: 3,
      value: "Yes",
    },
  ]);
  const [choice4, setChoice4] = useState([
    {
      id: 1,
      value: "Normal",
    },
    {
      id: 2,
      value: "Confusion",
    },
    {
      id: 3,
      value: "Drowsiness",
    },
    {
      id: 4,
      value: "Semi-coma",
    },
    {
      id: 5,
      value: "Coma",
    },
  ]);
  const [Anaesthesia, setAnaesthesia] = useState([
    {
      id: 1,
      value: "General Anaesthesia",
    },
    {
      id: 2,
      value: "Spinal Anaesthesia",
    },
    {
      id: 3,
      value: "Local Anaesthesia",
    },
    {
      id: 4,
      value: "Others",
    },
  ]);
  const [noOrYes, setNoOrYes] = useState([
    {
      id: 1,
      value: "No",
    },
    {
      id: 2,
      value: "Yes",
    },
  ]);
  const [choice5, setChoice5] = useState([
    {
      id: 1,
      value: "a) Physical defects/congenital anomaly",
    },
    {
      id: 2,
      value: "b) Degenerative change(s)",
    },
  ]);

  const [selectTabs, setSelectTabs] = useState(1);

  const handleSelectTabs = (id) => {
    setSelectTabs(id);
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

  return {
    sex,
    choice1,
    sick,
    everOrNever,
    choice2,
    yesOrNo,
    choice3,
    choice4,
    Anaesthesia,
    noOrYes,
    choice5,
    selectTabs,
    handleSelectTabs,
    formatThaiDateNoTime,
    calculateAge,
    convertISOToTime,
    formatAddress,
  };
}
