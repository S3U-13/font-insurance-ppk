"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Image } from "@heroui/image";

import { Select, SelectItem } from "@heroui/select";
import useHook from "./useHook";

export default function AddPatientModal({ isOpen, onClose }) {
  const {
    hn,
    setHn,
    handleSearchHn,
    visitData,
    formatThaiDateTime,
    formatThaiDateNoTime,
    visitId,
    setVisitId,
    handleVisitSelect,
    regData,
    regId,
    setRegId,
    handleSubmit,
    isSubmitting,
    handleReset,
  } = useHook({ onClose });
  const hasVisit = Array.isArray(visitData) && visitData.length > 0;
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      backdrop="blur"
      classNames={{
        header: "text-xl py-4 bg-[#d8efef] dark:bg-[#0e0e11]",
        body: "py-4 bg-[#edf7f7] bg-[#d8efef] dark:bg-[#0e0e11]",
        footer: "flex justify-between bg-[#d8efef] dark:bg-[#0e0e11]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              เพิ่มรายชื่อคนไข้ย้อนหลัง
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-4 gap-2 items-center">
                <Input
                  className="col-span-3"
                  label="HN"
                  size="sm"
                  value={hn ?? ""}
                  onChange={(e) => setHn(e.target.value)}
                  classNames={{
                    inputWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                  }}
                />
                <Button
                  className="capitalize bg-[#edf7f7] dark:bg-[#212126]  dark:border dark:border-[#212126]"
                  onPress={handleSearchHn}
                >
                  ค้นหา
                </Button>
              </div>
              {visitData.length > 0 ? (
                <Select
                  label="visit date"
                  className="w-full"
                  size="sm"
                  radius="sm"
                  color="default"
                  variant="flat"
                  selectedKeys={visitId ? new Set([visitId]) : new Set()}
                  onSelectionChange={(keys) => {
                    const visitId = Array.from(keys)[0];
                    setVisitId(visitId);
                    handleVisitSelect(visitId);
                  }}
                  classNames={{
                    mainWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg",
                  }}
                >
                  {visitData?.map((vs) => (
                    <SelectItem key={vs.id} value={String(vs.id)}>
                      {formatThaiDateTime(vs.visitdatetime)}
                    </SelectItem>
                  ))}
                </Select>
              ) : // : visitData.length < 1 ? (
              //   <div className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg h-70 p-6 overflow-hidden">
              //     <p className="text-center">
              //       ผู้ป่วยยังไม่มี visit ใหม่ หรือ visit ถูกสร้างไปเเล้ว !
              //     </p>
              //     <div className="flex justify-end">
              //       <Image
              //         isBlurred
              //         alt="HeroUI Album Cover"
              //         className=""
              //         src="/images/not-found.png"
              //         width={220}
              //       />
              //     </div>
              //   </div>
              // )
              null}
              {visitId && (
                <Select
                  label="reg date"
                  className="w-full"
                  size="sm"
                  radius="sm"
                  color="default"
                  variant="flat"
                  selectedKeys={regId ? new Set([regId]) : new Set()}
                  onSelectionChange={(keys) => {
                    const regId = Array.from(keys)[0];
                    setRegId(regId);
                  }}
                  classNames={{
                    mainWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg",
                  }}
                >
                  {regData?.map((vs) => (
                    <SelectItem key={vs.id} value={String(vs.id)}>
                      {` วันที่: ${formatThaiDateNoTime(vs?.visitdate)} สถานที่: ${vs?.location?.detailtext}`}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={handleReset}>
                reset
              </Button>
              <div className="space-x-2">
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {isSubmitting
                    ? "กำลังบันทึก..." // ขณะส่งข้อมูล
                    : "บันทึก"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
