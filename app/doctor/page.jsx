"use client";
import { div } from "framer-motion/client";
import React, { useState } from "react";
import useHook from "./useHook";
import { Button } from "@heroui/button";

import ModalIPD from "./insurance_form/create_form_ipd/page";
import ModalOPD from "./insurance_form/create_form_opd/page";
import ModalViewOPD from "./insurance_form/view_opd/page";
import ModalEditIPD from "./insurance_form/edit_form_ipd/page";
import ModalEditOPD from "./insurance_form/edit_form_opd/page";
import ModalApprove from "./insurance_form/modal-approve/page";

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
import { Edit, Eye, XCircle } from "@deemlol/next-icons";

export default function page() {
  const {
    openModalIPD,
    setOpenModalIPD,
    openModalOPD,
    setOpenModalOPD,
    openModalViewOPD,
    setOpenModalViewOPD,
    order,
    patData,
    setHn,
    setPatData,
    claimId,
    setClaimId,
    selectID,
    setSelectID,
    claimData,
    setClaimData,
    setPatReg,
    FetchAllForm,
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
    capitalize,
    onSortChange,
    status,
    statusFilter,
    setStatusFilter,
    setVisitId,
    forms,
    formFilter,
    setFormFilter,
    openModalEditIPD,
    setOpenModalEditIPD,
    openModalEditOPD,
    setOpenModalEditOPD,
    changeStatus,
    setChangeStatus,
    openModalApprove,
    setOpenModalApprove,
    modalRef,
  } = useHook();

  return (
    <div className="space-y-6 mt-6 ">
      <ModalIPD
        patData={patData}
        isOpen={openModalIPD}
        modalRef={modalRef}
        onClose={() => {
          setOpenModalIPD(false);
          FetchAllForm()
            .then((data) => setOrder(data || []))
            .catch(console.error);
        }}
      />
      <ModalOPD
        patData={patData}
        setPatData={setPatData}
        isOpen={openModalOPD}
        claimId={claimId}
        modalRef={modalRef}
        onClose={() => {
          setOpenModalOPD(false);
          FetchAllForm()
            .then((data) => setOrder(data || []))
            .catch(console.error);
        }}
      />
      <ModalViewOPD
        claimData={claimData}
        isOpen={openModalViewOPD}
        modalRef={modalRef}
        onClose={() => setOpenModalViewOPD(false)}
      />

      <ModalEditIPD
        patData={patData}
        claimData={claimData}
        isOpen={openModalEditIPD}
        modalRef={modalRef}
        onClose={() => {
          setOpenModalEditIPD(false);
          FetchAllForm()
            .then((data) => setOrder(data || []))
            .catch(console.error);
        }}
      />
      <ModalEditOPD
        patData={patData}
        selectID={selectID}
        claimData={claimData}
        setClaimData={setClaimData}
        isOpen={openModalEditOPD}
        modalRef={modalRef}
        onClose={() => {
          setOpenModalEditOPD(false);
          FetchAllForm()
            .then((data) => setOrder(data || []))
            .catch(console.error);
        }}
      />
      <ModalApprove
        claimId={claimId}
        claimData={claimData}
        changeStatus={changeStatus}
        isOpen={openModalApprove}
        modalRef={modalRef}
        onClose={() => {
          setOpenModalApprove(false);
          FetchAllForm()
            .then((data) => setOrder(data || []))
            .catch(console.error);
        }}
      />

      <h1 className="text-center text-xl">
        <strong>Hospital PPK Insurance Form</strong>
      </h1>

      <div className="p-4 space-y-2 border border-[#b0dddf] dark:border-divider rounded-xl bg-[#d8efef] dark:bg-[#0e0e11]">
        <div className="flex justify-between gap-2 items-center">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[30rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 dark:text-white bg-[#edf7f7] border border-[#b0dddf] dark:bg-[#212126] dark:border-[#212126]",
            }}
            placeholder="Type to search..."
            size="sm"
            variant="faded"
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
          <div className="flex items-center gap-2">
            <Dropdown className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]">
              <DropdownTrigger>
                <Button
                  className="capitalize bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]"
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
                variant="flat"
              >
                {forms.map((f) => (
                  <DropdownItem key={f.uid}>{f.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]">
              <DropdownTrigger>
                <Button
                  className="capitalize bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]"
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
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Status filter"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={(keys) => setStatusFilter(new Set(keys))}
                variant="flat"
              >
                {status.map((s) => (
                  <DropdownItem key={s.uid}>{s.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]">
              <DropdownTrigger>
                <Button
                  className="capitalize bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]"
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
                  Column
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                variant="flat"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="solid" size="md">
                  PDF IPD & OPD
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {/* <DropdownItem key="IPD" onPress={() => setOpenModalIPD(true)}>
                  IPD FORM
                </DropdownItem>
                <DropdownItem key="OPD" onPress={() => setOpenModalOPD(true)}>
                  OPD FORM
                </DropdownItem> */}
                <DropdownItem
                  key="IPD"
                  href="/api/generate-ipd-pdf"
                  target="_blank"
                >
                  IPD FORM
                </DropdownItem>
                <DropdownItem
                  key="OPD"
                  href="/api/generate-opd-pdf"
                  target="_blank"
                >
                  OPD FORM
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} records
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
            td: "px-4 py-3.5 border-b border-[#b0dddf] dark:border-divider pt-1",
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
            <TableColumn className="text-center">APPROVE</TableColumn>
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
                  {item.status === "pending" ? (
                    <Chip
                      className="p-1"
                      color="default"
                      endContent={<XCircle size={20} />}
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
                      รอดำเนินการกด approve
                    </Chip>
                  ) : item.status === "unapproved" ? (
                    <Chip
                      className="p-1"
                      color="danger"
                      endContent={<XCircle size={20} />}
                      variant="flat"
                    >
                      ยกเลิกรายการ
                    </Chip>
                  ) : item.status === "s_unapproved" ? (
                    <Chip
                      className="p-1"
                      color="warning"
                      endContent={<XCircle size={20} />}
                      variant="flat"
                    >
                      ทางประกันยกเลิกรายการ
                    </Chip>
                  ) : null}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2 items-center">
                    {item.status === "pending" ? (
                      <div>
                        {item.claimType === "OPD" ? (
                          <Button
                            isIconOnly
                            size="sm"
                            color="default"
                            variant="flat"
                            onPress={() => {
                              setHn(item.patientId);
                              setVisitId("");
                              setPatReg(item.patregId);
                              setClaimId(item.id);
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
                              setPatReg("");
                              setVisitId(item.visitId);
                              setClaimId(item.id);
                              setOpenModalIPD(true);
                            }}
                          >
                            <Edit size={20} />
                          </Button>
                        ) : null}
                      </div>
                    ) : item.status === "draft" ? (
                      <div>
                        {item.claimType === "OPD" ? (
                          <Button
                            isIconOnly
                            size="sm"
                            color="default"
                            variant="flat"
                            onPress={() => {
                              setHn(item.patientId);
                              setVisitId("");
                              setPatReg(item.patregId);
                              setClaimId(item.id);
                              setSelectID(item?.hospitalForm?.id);
                              setOpenModalEditOPD(true);
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
                              setPatReg("");
                              setVisitId(item.visitId);
                              setClaimId(item.id);
                              setSelectID(item?.hospitalForm?.id);
                              setOpenModalEditIPD(true);
                            }}
                          >
                            <Edit size={20} />
                          </Button>
                        ) : null}
                      </div>
                    ) : ["unapproved", "s_unapproved"].includes(item.status) ? (
                      <div>
                        {item.claimType === "OPD" ? (
                          <Button
                            isIconOnly
                            size="sm"
                            color="default"
                            variant="flat"
                            onPress={() => {
                              setClaimId(item.id);
                              setSelectID(item?.hospitalForm?.id);
                              setOpenModalEditOPD(true);
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
                              setClaimId(item.id);
                              setSelectID(item?.hospitalForm?.id);
                              setOpenModalEditIPD(true);
                            }}
                          >
                            <Edit size={20} />
                          </Button>
                        ) : null}
                      </div>
                    ) : null}

                    {item.status === "draft" && (
                      <>
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
                      </>
                    )}
                    {["unapproved", "s_unapproved"].includes(item.status) && (
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
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2 items-center">
                    {["draft", "unapproved", "s_unapproved"].includes(
                      item.status
                    ) && (
                      <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                        // onPress={() => handleApprove(item.id, "approve")}
                        onPress={() => {
                          setOpenModalApprove(true);
                          setChangeStatus("approve");
                          setClaimId(item.id);
                        }}
                      >
                        Approve
                      </Button>
                    )}
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
