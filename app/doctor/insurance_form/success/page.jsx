"use client";
import { div } from "framer-motion/client";
import React, { useState } from "react";
import useHook from "./useHook";
import { Button } from "@heroui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Pagination } from "@heroui/pagination";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Input } from "@heroui/input";

export default function page() {
  const { openModalIPD, setOpenModalIPD, openModalOPD, setOpenModalOPD, form } =
    useHook();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-center text-xl">
        <strong>Hospital PPK Insurance Form</strong>
      </h1>

      <div className="p-4 space-y-3 border border-divider rounded-xl bg-gray-50 dark:bg-[#0e0e11]">
        <div className="flex justify-between gap-2 items-center">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[30rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500",
            }}
            placeholder="Type to search..."
            size="sm"
            variant="bordered"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            }
            type="search"
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="capitalize"
                variant="flat"
                size="md"
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                Column
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Multiple selection example"
              closeOnSelect={false}
              selectedKeys={selectedKeys}
              selectionMode="multiple"
              variant="flat"
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem key="text">Text</DropdownItem>
              <DropdownItem key="number">Number</DropdownItem>
              <DropdownItem key="date">Date</DropdownItem>
              <DropdownItem key="single_date">Single Date</DropdownItem>
              <DropdownItem key="iteration">Iteration</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Table
          aria-label="Example static collection table"
          classNames={{
            th: "p-4",
            td: "px-4 py-3.5 border-b border-divider pt-2",
            base: "max-h-[calc(80vh-130px)]",
          }}
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
          <TableBody emptyContent={"ไม่มีข้อมูล"}>
            {form?.filter((order) => order.status === "approve").map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>OPD</TableCell>
                <TableCell>{item.patientId}</TableCell>
                <TableCell>นายสมมุติ หนึ่ง</TableCell>
                <TableCell>C681126</TableCell>
                <TableCell className="text-center">
                  <Chip
                    className="p-2"
                    color="success"
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    variant="flat"
                  >
                    ดำเนินการสำเร็จ
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
        <div className="flex justify-end ">
          <Pagination isCompact showControls initialPage={1} total={10} />
        </div>
      </div>
    </div>
  );
}
