"use client";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "../../hooks/useApi";

export default function useHook() {
  const { FetchAllForm } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const [openModalIPD, setOpenModalIPD] = useState(false);
  const [openModalOPD, setOpenModalOPD] = useState(false);
  const handleOpenModal = () => {
    setOpenModalIPD((prev) => !prev);
  };
  const [form, setForm] = useState();
  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    FetchAllForm()
      .then((data) => setForm(data || []))
      .catch(console.error);
  }, [FetchAllForm]);

  return { openModalIPD, setOpenModalIPD, openModalOPD, setOpenModalOPD, form };
}
