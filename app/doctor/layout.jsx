"use client";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import { DrawerProvider, useDrawer } from "../../context/drawProvider";

export default function Layout({ children }) {
  return (
    <DrawerProvider>
      <Content>{children}</Content>
    </DrawerProvider>
  );
}

function Content({ children }) {
  const { openDrawer, setOpenDrawer } = useDrawer();

  return (
    <div className="min-h-screen gap-4 p-4">
      <Navbar />
      <Sidebar isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />
      <main className=" mx-auto w-full">{children}</main>
    </div>
  );
}
