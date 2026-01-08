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
  claimData,
  selectID,
  setClaimData,
  modalRef,
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
    user,
    signatureCheck,
    openSignDoctor,
    setOpenSignDoctor,
    handleSaveSignatureDoctor,
    signatureDoctor,
    setSignatureDoctor,
  } = useHook({ onClose, claimData, selectID, isOpen, setClaimData });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="full"
        classNames={{
          body: "max-h-[calc(90vh-40px)] overflow-y-scroll bg-[#edf7f7] dark:bg-[#0e0e11]",
          header:
            "border-b border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
          footer:
            "border-t border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
        }}
      >
        <ModalContent ref={modalRef}>
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
                    (OPD) and Accident Claim Form (เเก้ไข)
                  </strong>
                </h1>
              </ModalHeader>
              <ModalBody>
                <FormOPD
                  sex={sex}
                  noOrYes={noOrYes}
                  choice2={choice2}
                  form={form}
                  claimData={claimData}
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
                  user={user}
                  signatureCheck={signatureCheck}
                  openSignDoctor={openSignDoctor}
                  setOpenSignDoctor={setOpenSignDoctor}
                  handleSaveSignatureDoctor={handleSaveSignatureDoctor}
                  signatureDoctor={signatureDoctor}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" isDisabled={isSubmitting}>
                  {isSubmitting
                    ? "กำลังบันทึก..." // ขณะส่งข้อมูล
                    : "บันทึก"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
