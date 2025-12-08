"use client";
import React from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import FormOPD from "./components/form_opd";
import useHook from "./useHook";

export default function page({
  isOpen,
  onClose,
  patData,
  setPatData,
  claimId,
}) {
  const {
    sex,
    noOrYes,
    choice2,
    form,
    isSubmitting,
    calculateAge,
    formatThaiDateNoTime,
    convertISOToTime,
    formatAddress,
    accidentTime,
    setAccidentTime,
    accidentDate,
    setAccidentDate,
    handleAccidentDateChange,
    handleAccidentTimeChange,
  } = useHook({ patData, setPatData, onClose, claimId });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="5xl"
        classNames={{
          body: "max-h-[calc(80vh-50px)] overflow-y-scroll",
          header: "border-b border-divider",
          footer: "border-t border-divider",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-center">
                  <strong>
                    เเบบฟอร์มการเรียกร้องค่าสินไหมกรณีผู้ป่วยนอก Outpatient
                    (OPD) and Accident Claim Form
                  </strong>
                </h1>
              </ModalHeader>
              <ModalBody>
                <FormOPD
                  sex={sex}
                  noOrYes={noOrYes}
                  choice2={choice2}
                  form={form}
                  patData={patData}
                  setPatData={setPatData}
                  calculateAge={calculateAge}
                  formatThaiDateNoTime={formatThaiDateNoTime}
                  convertISOToTime={convertISOToTime}
                  formatAddress={formatAddress}
                  accidentTime={accidentTime}
                  setAccidentTime={setAccidentTime}
                  accidentDate={accidentDate}
                  setAccidentDate={setAccidentDate}
                  handleAccidentDateChange={handleAccidentDateChange}
                  handleAccidentTimeChange={handleAccidentTimeChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" isDisabled={isSubmitting}>
                  {isSubmitting
                    ? "กำลังบันทึก..." // ขณะส่งข้อมูล
                    : "ยืนยัน"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
