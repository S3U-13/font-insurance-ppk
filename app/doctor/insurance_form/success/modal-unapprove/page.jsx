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
export default function page({ isOpen, onClose, changeStatus, claimId }) {
  const { handleUnApprove } = useHook({ onClose });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        backdrop="blur"
        classNames={{ footer: "flex justify-center gap-4" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-center">Confirm</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-center">คุณต้องการ UnApprove หรือไม่ ?</p>
                <p>รายการที่ :</p>
                <div>รายละเอียด :</div>
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
                  onPress={() => handleUnApprove(claimId, changeStatus)}
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
