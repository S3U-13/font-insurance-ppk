"use client";

import Sidebar from "../../components/sidebar";
import { DrawerProvider, useDrawer } from "../../Context/drawProvider";

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
    <div className="min-h-screen grid grid-cols-12 gap-4 p-4">
      <Sidebar isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />
      <main className="col-span-10 mx-auto w-full">{children}</main>
    </div>
  );
}
