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

import ModalUnApprove from "./modal-unapprove/page";
import ModalPreviewPdf from "../preview-pdf/page";
import ModalViewOPD from "../view_opd/page";
import {
  Eye,
  FileText,
  XCircle,
  Clock,
  CheckCircle,
} from "@deemlol/next-icons";

export default function page() {
  const {
    openModalIPD,
    setOpenModalIPD,
    openModalOPD,
    setOpenModalOPD,
    openModalViewIPD,
    setOpenModalViewIPD,
    openModalViewOPD,
    setOpenModalViewOPD,
    order,
    patData,
    setHn,
    setPatData,
    claimId,
    setClaimId,
    setSelectID,
    claimData,
    setPatReg,
    // FetchAllForm,
    setOrder,
    filterValue,
    setFilterValue,
    visibleColumns,
    setVisibleColumns,
    columns,
    filteredItems,
    rowsPerPage,
    onRowsPerPageChange,
    headerColumns,
    sortDescriptor,
    sortedItems,
    page,
    pages,
    setPage,
    onClear,
    // selectedKeys,
    // setSelectedKeys,
    capitalize,
    onSortChange,
    status,
    // statusFilter,
    // setStatusFilter,
    setVisitId,
    forms,
    formFilter,
    setFormFilter,
    FetchAllFormStatusApproved,
    openModalUnApprove,
    setOpenModalUnApprove,
    changeStatus,
    setChangeStatus,
    previewPdfModal,
    setPreviewPdfModal,
    base64PdfOpd,
    loading,
  } = useHook();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <div className="space-y-6 mt-6">
      <ModalViewOPD
        claimData={claimData}
        isOpen={openModalViewOPD}
        onClose={() => setOpenModalViewOPD(false)}
      />
      <ModalPreviewPdf
        base64PdfOpd={base64PdfOpd}
        isOpen={previewPdfModal}
        loading={loading}
        onClose={() => setPreviewPdfModal(false)}
      />
      <ModalUnApprove
        changeStatus={changeStatus}
        claimData={claimData}
        claimId={claimId}
        isOpen={openModalUnApprove}
        onClose={() => {
          setOpenModalUnApprove(false);
          FetchAllFormStatusApproved()
            .then((data) => setOrder(data || []))
            .catch(console.error);
        }}
      />
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
            value={filterValue}
            onValueChange={setFilterValue}
            onClear={onClear}
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
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="capitalize"
                  variant="flat"
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
                  Forms Type
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status filter"
                closeOnSelect={false}
                selectedKeys={formFilter}
                selectionMode="multiple"
                onSelectionChange={(keys) => setFormFilter(new Set(keys))}
              >
                {forms.map((f) => (
                  <DropdownItem key={f.uid}>{f.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
        </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total{" "}
            {filteredItems.filter((item) => item.status === "success").length}{" "}
            records
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
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
            {headerColumns.map((col) => (
              <TableColumn key={col.uid}>
                <div
                  className="flex items-center"
                  onClick={() => onSortChange(col.uid)}
                >
                  {capitalize(col.name)}
                  {sortDescriptor.column === col.uid && (
                    <svg
                      className={`w-4 h-3 ml-1 transition-transform ${
                        sortDescriptor.direction === "ascending"
                          ? "rotate-0"
                          : "rotate-180"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </div>
              </TableColumn>
            ))}
            <TableColumn className="text-center">STATUS</TableColumn>
            <TableColumn className="text-center">ACTION</TableColumn>
            <TableColumn className="text-center">APPROVE</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"ไม่มีข้อมูล"}>
            {sortedItems?.map((item, index) => (
              <TableRow key={item.id}>
                {headerColumns.map((col) => (
                  <TableCell key={col.uid}>
                    {col.uid === "id" && item?.id}
                    {col.uid === "form_type" && item?.claimType}{" "}
                    {col.uid === "hn" && item?.patientId}
                    {col.uid === "name" &&
                      `${item?.patient?.prename}${item?.patient?.firstname} ${item?.patient?.lastname}`}
                  </TableCell>
                ))}

                <TableCell className="text-center">
                  {item.status === "approved" ? (
                    <Chip
                      className="p-2"
                      color="warning"
                      endContent={<Clock size={20} />}
                      variant="flat"
                    >
                      รอทางประกันตรวจสอบข้อมูล
                    </Chip>
                  ) : item.status === "s_approved" ? (
                    <Chip
                      className="p-2"
                      color="primary"
                      endContent={<CheckCircle size={20} />}
                      variant="flat"
                    >
                      ทางประกันตรวจสอบข้อมูลเเล้ว
                    </Chip>
                  ) : null}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2 items-center">
                    {["approved", "s_unapproved"] && (
                      <Button
                        isIconOnly
                        size="sm"
                        color="default"
                        variant="flat"
                        onPress={() => {
                          setClaimId(item.id);
                          setOpenModalViewOPD(true);
                        }}
                      >
                        <Eye size={20} />
                      </Button>
                    )}
                    {item.claimType === "OPD" ? (
                      <Button
                        isIconOnly
                        size="sm"
                        color="default"
                        variant="flat"
                        as="a"
                        onPress={() => {
                          setClaimId(item.id);
                          setPreviewPdfModal(true);
                        }}
                      >
                        <FileText size={20} />
                      </Button>
                    ) : item.claimType === "IPD" ? (
                      <Button
                        isIconOnly
                        size="sm"
                        color="default"
                        variant="flat"
                        as="a"
                        onPress={() => {
                          setClaimId(item.id);
                          setPreviewPdfModal(true);
                        }}
                      >
                        <FileText size={20} />
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2 items-center ">
                    {["approved", "unapproved"].includes(item.status) ? (
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() => {
                          setOpenModalUnApprove(true);
                          setChangeStatus("unapprove");
                          setClaimId(item.id);
                        }}
                        // onPress={() => handleUnApprove(item.id, "unapprove")}
                      >
                        Unapproved
                      </Button>
                    ) : item.status === "s_approved" ? (
                      <Button
                        className=""
                        isDisabled
                        radius="full"
                        color="default"
                        size="sm"
                        variant="solid"
                        onPress={() => {
                          setOpenModalUnApprove(true);
                          setChangeStatus("unapprove");
                          setClaimId(item.id);
                        }}
                        // onPress={() => handleUnApprove(item.id, "unapprove")}
                      >
                        ประกันได้กด approved เเล้ว
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end ">
          <Pagination
            classNames={{ wrapper: "border border-divider" }}
            isCompact
            showControls
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
