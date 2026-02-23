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

import { Tabs, Tab } from "@heroui/tabs";
import PartA from "./part/part_a";
import PartB from "./part/part_b";

import useHook from "./useHook";

export default function ModalViewIPD({ isOpen, onClose, claimData }) {
  const {
    calculateAge,
    formatAddress,
    formatThaiDateNoTime,
    formatTimeNoDate,
    sortedIds,
    diagMap,
    operMap,
    pastHistoryMap,
    formatThaiDateTime,
    steps,
    activeStep,
    setActiveStep,
    patient_name,
  } = useHook({ claimData });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="full"
        classNames={{
          body: "max-h-[calc(90vh-70px)] overflow-y-scroll bg-[#edf7f7] dark:bg-[#0e0e11] lg:px-50",
          header:
            "border-b border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
          footer:
            "border-t border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-center">
                  <strong>
                    ดูข้อมูล การเคลมเเบบฟอร์มการเรียกร้องค่าสินไหมกรณีผู้ป่วยนอก
                    Outpatient (IPD) and Accident Claim Form
                  </strong>
                </h1>

                <div className="text-center pt-2">
                  <p>
                    <strong>Hospital Name</strong> พระปกเกล้า จันทบุรี
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  classNames={{
                    base: "mx-auto border border-[#b0dddf] dark:border-divider rounded-lg bg-[#d8efef] dark:bg-[#0e0e11] text-xl font-bold w-full flex justify-center",
                    tab: "w-60",
                  }}
                  className="sticky top-0 z-50"
                  selectedKey={activeStep}
                  onSelectionChange={(key) => setActiveStep(String(key))}
                >
                  <Tab key="1" title="PART A" disabled>
                    <PartA
                      calculateAge={calculateAge}
                      formatAddress={formatAddress}
                      formatThaiDateNoTime={formatThaiDateNoTime}
                      formatTimeNoDate={formatTimeNoDate}
                      sortedIds={sortedIds}
                      claimData={claimData}
                      patient_name={patient_name}
                      formatThaiDateTime={formatThaiDateTime}
                    />
                  </Tab>
                  <Tab key="2" title="PART B" disabled>
                    <PartB
                      calculateAge={calculateAge}
                      formatAddress={formatAddress}
                      formatThaiDateNoTime={formatThaiDateNoTime}
                      formatTimeNoDate={formatTimeNoDate}
                      sortedIds={sortedIds}
                      diagMap={diagMap}
                      operMap={operMap}
                      pastHistoryMap={pastHistoryMap}
                      formatThaiDateTime={formatThaiDateTime}
                      claimData={claimData}
                      patient_name={patient_name}
                    />
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  onPress={() => {
                    const idx = steps.indexOf(activeStep);
                    if (idx > 0) setActiveStep(steps[idx - 1]); // ย้อนกลับไป step ก่อนหน้า
                    if (steps.indexOf(activeStep) === 0) {
                      onClose();
                    }
                  }}
                >
                  {activeStep === steps[steps.length - 1]
                    ? "กลับ" // ขณะส่งข้อมูล
                    : "ปิด"}
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    const idx = steps.indexOf(activeStep);
                    if (idx < steps.length - 1) {
                      // ถ้ายังไม่ถึง step สุดท้าย
                      setActiveStep(steps[idx + 1]);
                    } else {
                      onClose();
                    }
                  }}
                >
                  {activeStep === steps[steps.length - 1] ? "ปิด" : "ถัดไป"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
