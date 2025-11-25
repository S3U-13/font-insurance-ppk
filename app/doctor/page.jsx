"use client";
import { div } from "framer-motion/client";
import React from "react";
import useHook from "./useHook";
import { Button } from "@heroui/button";
import { useDrawer } from "../../Context/drawProvider";
import ModalIPD from "./create_form_ipd/page";
import ModalOPD from "./create_form_opd/page";

export default function page() {
  const { setOpenDrawer } = useDrawer();
  const { openModalIPD, setOpenModalIPD, openModalOPD, setOpenModalOPD } =
    useHook();
  return (
    <div>
      <Button onPress={() => setOpenDrawer(true)} isIconOnly>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <Button onPress={() => setOpenModalIPD(true)}>OpenIPD</Button>
      <Button onPress={() => setOpenModalOPD(true)}>OpenOPD</Button>
      <ModalIPD isOpen={openModalIPD} onClose={() => setOpenModalIPD(false)} />
      <ModalOPD isOpen={openModalOPD} onClose={() => setOpenModalOPD(false)} />
    </div>
  );
}
