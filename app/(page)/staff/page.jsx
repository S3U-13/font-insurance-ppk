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
import ModalViewOPD from "../doctor/insurance_form/view_opd/page";
import ModalUnApprove from "../doctor/insurance_form/success/modal-unapprove/page";
import ModalPreviewPdf from "../doctor/insurance_form/preview-pdf/page";
import ModalApprove from "../doctor/insurance_form/modal-approve/page";
import { Eye, FileText, XCircle, CheckCircle } from "@deemlol/next-icons";

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
    openModalApprove,
    setOpenModalApprove,
  } = useHook();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
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
      <ModalApprove
        claimId={claimId}
        claimData={claimData}
        changeStatus={changeStatus}
        isOpen={openModalApprove}
        onClose={() => {
          setOpenModalApprove(false);
          FetchAllFormStatusApproved()
            .then((data) => setOrder(data || []))
            .catch(console.error);
        }}
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

      <div className="p-4 space-y-2 dark:border dark:border-divider rounded-xl bg-[#d8efef] dark:bg-[#0e0e11]">
        <div className="flex justify-between gap-2 items-center">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[30rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 dark:text-white bg-[#edf7f7] dark:border dark:bg-[#212126] dark:border-[#212126]",
            }}
            placeholder="Type to search..."
            size="sm"
            variant="flat"
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
            <Dropdown className="bg-[#edf7f7] dark:bg-[#212126] dark:border dark:border-[#212126]">
              <DropdownTrigger>
                <Button
                  className="capitalize bg-[#edf7f7] dark:bg-[#212126]  dark:border dark:border-[#212126]"
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
            {/* <Dropdown className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]">
              <DropdownTrigger>
                <Button
                  className="capitalize bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]"
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
            </Dropdown> */}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.filter((item) => item.id).length} records
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
            th: "p-4 bg-[#d8efef] dark:bg-[#27272A] text-gray-700 dark:text-white ",
            td: "px-4 py-2 border-b border-[#b0dddf] dark:border-divider",
            base: "max-h-[calc(80vh-150px)]",
            wrapper: "bg-[#edf7f7] dark:bg-[#18181B]",
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
            {/* <TableColumn className="text-center">APPROVE</TableColumn> */}
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
                  {item.status === "draft" && (
                    <Chip
                      className="p-2"
                      color="default"
                      endContent={<CheckCircle size={20} />}
                      variant="flat"
                    >
                      ทางเเพทย์ได้ทำการยื่นเรื่องเเล้ว
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2 items-center">
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
                {/* <TableCell>
                  <div className="flex justify-center gap-2 items-center">
                    {item.status === "approved" ? (
                      <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                        // onPress={() => handleApprove(item.id, "approve")}
                        onPress={() => {
                          setOpenModalApprove(true);
                          setChangeStatus("staffapprove");
                          setClaimId(item.id);
                        }}
                      >
                        Approve
                      </Button>
                    ) : item.status === "s_approved" ? (
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        // onPress={() => handleApprove(item.id, "approve")}
                        onPress={() => {
                          setOpenModalUnApprove(true);
                          setChangeStatus("staffunapprove");
                          setClaimId(item.id);
                        }}
                      >
                        UnApprove
                      </Button>
                    ) : item.status === "s_unapproved" ? (
                      <Button
                        color="default"
                        isDisabled
                        size="sm"
                        variant="solid"
                        // onPress={() => handleApprove(item.id, "approve")}
                        onPress={() => {
                          setOpenModalApprove(true);
                          setChangeStatus("staffunapprove");
                          setClaimId(item.id);
                        }}
                      >
                        รอการเเก้ไขข้อมูล
                      </Button>
                    ) : null}
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end ">
          <Pagination
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
