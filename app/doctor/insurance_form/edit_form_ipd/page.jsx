"use client";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Tabs, Tab } from "@heroui/tabs";
import React from "react";
import useHook from "./useHook";
import PartA from "./components/part_a";
import PartB from "./components/part_b";

export default function page({ isOpen, onClose, claimData }) {
  const {
    sex,
    choice1,
    sick,
    everOrNever,
    choice2,
    yesOrNo,
    choice3,
    choice4,
    Anaesthesia,
    noOrYes,
    choice5,
    selectTabs,
    handleSelectTabs,
    formatThaiDateNoTime,
    calculateAge,
    convertISOToTime,
    formatAddress,
  } = useHook();
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
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {selectTabs === 1 && (
                  <>
                    <h1>
                      <strong>
                        Admission Notification Form (all cases) (เเก้ไข)
                      </strong>
                    </h1>
                    <p>
                      <strong>Hospital Name</strong> พระปกเกล้า จันทบุรี
                    </p>
                  </>
                )}
                {selectTabs === 2 && (
                  <>
                    <h1>
                      <strong>Discharge Notification Form</strong>
                    </h1>
                    <p>
                      <strong>Hospital Name</strong> พระปกเกล้า จันทบุรี
                    </p>
                  </>
                )}
              </ModalHeader>
              <ModalBody>
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  classNames={{ base: "mx-auto" }}
                >
                  <Tab
                    key={1}
                    title="PART A"
                    onClick={() => handleSelectTabs(1)}
                  >
                    <PartA
                      sex={sex}
                      choice1={choice1}
                      sick={sick}
                      everOrNever={everOrNever}
                      choice2={choice2}
                      yesOrNo={yesOrNo}
                      patData={patData}
                      calculateAge={calculateAge}
                      formatThaiDateNoTime={formatThaiDateNoTime}
                      convertISOToTime={convertISOToTime}
                      formatAddress={formatAddress}
                    />
                  </Tab>
                  <Tab
                    key={2}
                    title="PART B"
                    onClick={() => handleSelectTabs(2)}
                  >
                    <PartB
                      sex={sex}
                      choice3={choice3}
                      choice4={choice4}
                      sick={sick}
                      everOrNever={everOrNever}
                      choice2={choice2}
                      yesOrNo={yesOrNo}
                      Anaesthesia={Anaesthesia}
                      noOrYes={noOrYes}
                      choice5={choice5}
                      patData={patData}
                      calculateAge={calculateAge}
                      formatThaiDateNoTime={formatThaiDateNoTime}
                      convertISOToTime={convertISOToTime}
                      formatAddress={formatAddress}
                    />
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  บันทึก
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
