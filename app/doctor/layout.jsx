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
  const { openDrawer, setOpenDrawer, drawerRef } = useDrawer();

  return (
    <div className="min-h-screen grid grid-cols-12 grid-rows-[auto_1fr] p-4 bg-gray-50 dark:bg-[#0e0e11]">
      <div className={openDrawer ? "col-span-2 transition-all" : "hidden"}>
        <Sidebar
          isOpen={openDrawer}
          onClose={() => setOpenDrawer(false)}
          drawerRef={drawerRef}
        />
      </div>
      <div
        className={
          openDrawer
            ? "col-span-10 mr-auto w-full transition-all"
            : "col-span-12 transition-all"
        }
      >
        <Navbar />
      </div>

      <main
        className={
          openDrawer
            ? "col-start-3 col-span-10 transition-all mt-0 pt-0"
            : "col-span-12 transition-all mt-0 pt-0"
        }
      >
        {children}
      </main>
    </div>
  );
}
