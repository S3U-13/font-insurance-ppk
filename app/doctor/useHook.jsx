"use client";
import React, { useState } from "react";

export default function useHook() {
  const [openModalIPD, setOpenModalIPD] = useState(false);
  const [openModalOPD, setOpenModalOPD] = useState(false);
  const handleOpenModal = () => {
    setOpenModalIPD((prev) => !prev);
  };

  return { openModalIPD, setOpenModalIPD, openModalOPD, setOpenModalOPD };
}
