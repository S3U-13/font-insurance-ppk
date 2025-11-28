"use client";
import React, { useState } from "react";

export default function useHook() {
  const [drawerLogin, setDrawerLogin] = useState(false);
  const handleDrawerLogin = () => {
    setDrawerLogin((prev) => !prev);
  };

  return { drawerLogin, setDrawerLogin };
}
