"use client";
import React from "react";
import { Button, ButtonGroup } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import useHook from "./useHook";
export default function page({
  isOpen,
  onClose,
  changeStatus,
  claimId,
  claimData,
}) {
  const { handleApprove, calculateAge, formatThaiDateTime, isSubmitting } =
    useHook({
      onClose,
    });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        backdrop="blur"
        classNames={{
          footer: "flex justify-center gap-4 border-t border-divider",
          header: "pt-6 border-b border-divider",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-center ">คุณต้องการ Approve หรือไม่ ?</h1>
              </ModalHeader>
              <ModalBody>
                <div className="px-8">
                  <p className="font-bold">รายละเอียด</p>{" "}
                  <div className="flex justify-between test-sm">
                    <p>รายการที่ </p>
                    <span className="text-gray-600">
                      {claimData?.id || ""}
                    </span>
                  </div>
                  <div className="flex justify-between test-sm">
                    <p>ประเภทของผู้ป่วย</p>
                    <span className="text-gray-600">
                      {claimData?.claimType || ""}
                    </span>
                  </div>
                  <div className="flex justify-between test-sm">
                    <p>ชื่อ</p>
                    <span className="text-gray-600">{`${claimData?.his?.patient?.prename}${claimData?.his?.patient?.firstname} ${claimData?.his?.patient?.lastname}`}</span>
                  </div>
                  <div className="flex justify-between test-sm">
                    <p>อายุ</p>
                    <span className="text-gray-600">{`${calculateAge(claimData?.his?.patient?.birthdatetime).years} ปี ${calculateAge(claimData?.his?.patient?.birthdatetime).months} เดือน`}</span>
                  </div>
                  <div className="flex justify-between test-sm">
                    <p>วันทำรายการ</p>
                    <span className="text-gray-600">
                      {formatThaiDateTime(claimData?.createdAt)}
                    </span>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="lg"
                  isIconOnly
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  endContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  }
                ></Button>
                <Button
                  size="lg"
                  isIconOnly
                  color="success"
                  variant="flat"
                  onPress={() => handleApprove(claimId, changeStatus)}
                  disabled={isSubmitting}
                  endContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  }
                ></Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
