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
  const [noOrYes, setNoOrYes] = useState([
    {
      id: 1,
      value: "ไม่มี",
    },
    {
      id: 2,
      value: "มี",
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
  ]);
  return {
    sex,
    noOrYes,
    choice2,
  };
}
