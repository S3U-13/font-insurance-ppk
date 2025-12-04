"use client";
import { div } from "framer-motion/client";
import React from "react";
import useHook from "./useHook";
import { Button } from "@heroui/button";

import ModalIPD from "./insurance_form/create_form_ipd/page";
import ModalOPD from "./insurance_form/create_form_opd/page";
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
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Edit, Eye, FileText, XCircle } from "@deemlol/next-icons";

export default function page() {
  const {
    openModalIPD,
    setOpenModalIPD,
    openModalOPD,
    setOpenModalOPD,
    order,
    patData,
    setHn,
    setPatData,
  } = useHook();
  return (
    <div className="space-y-6 mt-6 ">
      <ModalIPD
        patData={patData}
        isOpen={openModalIPD}
        onClose={() => setOpenModalIPD(false)}
      />
      <ModalOPD
        patData={patData}
        setPatData={setPatData}
        isOpen={openModalOPD}
        onClose={() => setOpenModalOPD(false)}
      />

      <h1 className="text-center text-xl">
        <strong>Hospital PPK Insurance Form</strong>
      </h1>

      <div className="p-4 space-y-3 border border-divider rounded-xl bg-gray-100 dark:bg-[#0e0e11]">
        <div className="flex justify-between gap-2 items-center">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[30rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 ",
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
                color="primary"
                variant="solid"
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                ADD FORM
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="IPD" onPress={() => setOpenModalIPD(true)}>
                IPD FORM
              </DropdownItem>
              <DropdownItem key="OPD" onPress={() => setOpenModalOPD(true)}>
                OPD FORM
              </DropdownItem>
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
            {/* <TableColumn className="text-center">APPROVE</TableColumn> */}
          </TableHeader>
          <TableBody emptyContent={"ไม่มีข้อมูล"}>
            {order?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.claimType}</TableCell>
                <TableCell>{item.patientId}</TableCell>
                <TableCell>{item.patientId}</TableCell>
                <TableCell>C681126</TableCell>
                <TableCell className="text-center">
                  {item.status === "pending" ? (
                    <Chip
                      className="p-1"
                      color="primary"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                      variant="flat"
                    >
                      ยังไม่ได้กรอกข้อมูล
                    </Chip>
                  ) : item.status === "draft" ? (
                    <Chip
                      className="p-1"
                      color="warning"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                      variant="flat"
                    >
                      รอดำเนินการ
                    </Chip>
                  ) : item.status === "cancel" ? (
                    <Chip
                      className="p-1"
                      color="danger"
                      endContent={<XCircle size={20} />}
                      variant="flat"
                    >
                      Cancel approval
                    </Chip>
                  ) : null}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2 items-center">
                    {item.claimType === "OPD" ? (
                      <Button
                        isIconOnly
                        size="sm"
                        color="default"
                        variant="flat"
                        onPress={() => {
                          setHn(item.patientId);
                          setOpenModalOPD(true);
                        }}
                      >
                        <Edit size={20} />
                      </Button>
                    ) : item.claimType === "IPD" ? (
                      <Button
                        isIconOnly
                        size="sm"
                        color="default"
                        variant="flat"
                        onPress={() => {
                          setHn(item.patientId);
                          setOpenModalIPD(true);
                        }}
                      >
                        <Edit size={20} />
                      </Button>
                    ) : null}

                    <Button isIconOnly size="sm" color="default" variant="flat">
                      <Eye size={20} />
                    </Button>
                    {/* <Button color="primary">
                      ปริ้น PDF
                    </Button> */}
                    <Button isIconOnly size="sm" color="default" variant="flat" as="a" href="/api/generate-opd-pdf" target="_blank">
                      <FileText size={20} />
                    </Button>
                  </div>
                </TableCell>
                {/* <TableCell className="flex items-center justify-center gap-2">
                  <Button color="primary" size="sm" variant="flat">
                    Approve
                  </Button>
                  <Button color="danger" size="sm" variant="flat">
                    UnApprove
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end ">
          <Pagination
            classNames={{ wrapper: "border border-divider" }}
            isCompact
            showControls
            initialPage={1}
            total={10}
          />
        </div>
      </div>
    </div>
  );
}
