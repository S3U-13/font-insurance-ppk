"use client";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "../../hooks/useApi";
import { colgroup } from "framer-motion/client";

export default function useHook() {
  const { pullData, pullClaimData, FetchAllForm } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const [openModalIPD, setOpenModalIPD] = useState(false);
  const [openModalOPD, setOpenModalOPD] = useState(false);
  const [openModalViewIPD, setOpenModalViewIPD] = useState(false);
  const [openModalViewOPD, setOpenModalViewOPD] = useState(false);

  // const handleOpenModal = () => {
  //   setOpenModalIPD((prev) => !prev);
  //   setOpenModalOPD((prev) => !prev);
  // };
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
  const [claimId, setClaimId] = useState("");
  const [selectID, setSelectID] = useState("");
  const [claimData, setClaimData] = useState(null);
 
  useEffect(() => {
    if (!openModalOPD && !openModalIPD) return;
    if (!hn) return;
    const fetchData = async () => {
      const data = await pullData(hn, setPatData);
      setPatData(data);
    };
    fetchData();
  }, [openModalOPD, openModalIPD, hn]);

  useEffect(() => {
    if (!openModalViewOPD && !openModalViewIPD) return;
    if (!selectID) return;
    const fetchDataView = async () => {
      const data = await pullClaimData(selectID, setClaimData);
      setClaimData(data);
    };

    fetchDataView();
  }, [openModalViewOPD, openModalViewIPD, selectID]);

  return {
    openModalIPD,
    setOpenModalIPD,
    openModalOPD,
    setOpenModalOPD,
    openModalViewOPD,
    setOpenModalViewOPD,
    order,
    patData,
    setHn,
    setPatData,
    claimId,
    setClaimId,
    selectID,
    setSelectID,
    claimData,
  };
}
