"use client";
import { div } from "framer-motion/client";
import React from "react";
import useHook from "./useHook";
import { Button } from "@heroui/button";

import ModalIPD from "./create_form_ipd/page";
import ModalOPD from "./create_form_opd/page";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Chip } from "@heroui/chip";

export default function page() {
  const { openModalIPD, setOpenModalIPD, openModalOPD, setOpenModalOPD, form } =
    useHook();
  return (
    <div className="space-y-6">
      <ModalIPD isOpen={openModalIPD} onClose={() => setOpenModalIPD(false)} />
      <ModalOPD isOpen={openModalOPD} onClose={() => setOpenModalOPD(false)} />

      <h1 className="text-center text-xl">
        <strong>Hospital PPK Insurance Form</strong>
      </h1>

      <div className="p-6 space-y-4 border border-divider rounded-xl">
        <div className="flex justify-end gap-2 items-center">
          <Button onPress={() => setOpenModalIPD(true)}>OpenIPD</Button>
          <Button onPress={() => setOpenModalOPD(true)}>OpenOPD</Button>
        </div>

        <Table
          aria-label="Example static collection table"
          classNames={{ th: "p-4", td: "p-4 border-b border-divider pt-2" }}
        >
          <TableHeader>
            <TableColumn>NO</TableColumn>
            <TableColumn>FORM NAME</TableColumn>
            <TableColumn>HN</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>CLAIM ID</TableColumn>
            <TableColumn className="text-center">STATUS</TableColumn>
            <TableColumn className="text-center">ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {form?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>OPD</TableCell>
                <TableCell>{item.patientId}</TableCell>
                <TableCell>นายสมมุติ หนึ่ง</TableCell>
                <TableCell>C681126</TableCell>
                <TableCell className="text-center">
                  <Chip
                    className="p-2"
                    color="warning"
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5.5 animate-spin"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    variant="faded"
                  >
                    รอดำเนินการ
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2 items-center">
                    <Button isIconOnly size="sm" color="default" variant="flat">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4.5 rounded-md"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </Button>
                    <Button isIconOnly size="sm" color="default" variant="flat">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4.5 rounded-md"
                      >
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                    <Button isIconOnly size="sm" color="default" variant="flat">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4.5 rounded-md"
                      >
                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                      </svg>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
