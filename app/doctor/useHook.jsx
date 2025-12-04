"use client";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "../../hooks/useApi";
import { colgroup } from "framer-motion/client";

export default function useHook() {
  const { pullData, FetchAllForm } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const [openModalIPD, setOpenModalIPD] = useState(false);
  const [openModalOPD, setOpenModalOPD] = useState(false);

  const handleOpenModal = () => {
    setOpenModalIPD((prev) => !prev);
  };
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    FetchAllForm()
      .then((data) => setOrder(data || []))
      .catch(console.error);
  }, [FetchAllForm]);

  const [patData, setPatData] = useState(null);
  const [hn, setHn] = useState("");

  useEffect(() => {
    if (!openModalOPD && !openModalIPD) return;
    if (!hn) return;
    const fetchData = async () => {
      const data = await pullData(hn, setPatData);
      setPatData(data);
    };

    fetchData();
  }, [openModalOPD, openModalIPD, hn]);

  return {
    openModalIPD,
    setOpenModalIPD,
    openModalOPD,
    setOpenModalOPD,
    order,
    patData,
    setHn,
    setPatData,
  };
}
